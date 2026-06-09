/// <reference lib="deno.unstable" />
import { Hono } from "jsr:@hono/hono@4.7.4";
import { getConnInfo } from "jsr:@hono/hono@4.7.4/deno";
import { serveStatic } from "jsr:@hono/hono@4.7.4/serve-static";
import {
  POINT_1ST,
  POINT_CORRECTED,
  POINT_MISSED,
  ServerContext,
  SocketDataType,
  User,
} from "./types.ts";
import { ClientSocket, createSocket } from "./socket.ts";

// 画像消去
try {
  await Deno.remove("./page/icons/", { recursive: true });
} catch {
}
await Deno.mkdir("./page/icons/");

// サーバーの作成
const app = new Hono();

const context: ServerContext = {
  users: {},
  icons: {},
  nowQuestion: {
    qid: -1,
  },
};

let admin: ClientSocket | null = null;

// Eventをブロードキャスト
function broadCast<K extends keyof SocketDataType>(
  name: K,
  value: SocketDataType[K],
) {
  admin && admin.ws.readyState === WebSocket.OPEN && admin.send(name, value);
  for (const id in context.users) {
    context.users[id].ws.ws.readyState === WebSocket.OPEN &&
      context.users[id].ws.send(name, value);
  }
}

// 参加しているユーザーを取得
app.get("/joined", (c) => {
  const res: User[] = [];
  for (const id in context.users) {
    context.users[id].user && res.push(context.users[id].user);
  }
  return c.json(res);
});

// アイコンをアップロード
app.post("/icons/:id", async (c) => {
  const id = c.req.param("id");
  const ct = c.req.header("content-type");
  if (!id || !ct) {
    return c.text("Server Error", 403);
  }
  context.icons[id] = ct.split("/")[1];
  await Deno.writeFile(
    "./page/icons/" + id + "." + ct.split("/")[1],
    new Uint8Array(await c.req.arrayBuffer()),
  );
  return c.text(id);
});

// アイコンを取得
app.get("/icons/:id", async (c) => {
  const id = c.req.param("id");
  if (!id || !context.icons[id]) {
    return c.text("Server Error", 403);
  }
  c.header("content-type", "image/" + context.icons[id]);
  // Cache-Control: max-age=604800
  c.header("Cache-Control", "max-age=604800");
  return c.body(
    (await Deno.readFile("./page/icons/" + id + "." + context.icons[id]))
      .buffer,
  );
});

// Admin WebSocketの作成
app.get("/ws-admin", (c) => {
  if (
    getConnInfo(c).remote.address !== "localhost" &&
    getConnInfo(c).remote.address !== "127.0.0.1"
  ) {
    console.log(getConnInfo(c).remote.address);
    return c.text("Admin only", 403);
  }
  if (c.req.raw.headers.get("upgrade") !== "websocket") {
    return c.text("WebSocket only", 400);
  }
  const { socket, response } = Deno.upgradeWebSocket(c.req.raw);
  createSocket(socket).then((ws) => {
    admin = ws;
    ws.on("end", () => {
      const users: User[] = [];
      for (const id in context.users) {
        context.users[id].user && users.push(context.users[id].user);
      }
      broadCast("end", { users });
    })
    ws.on("start", (t) => {
      for (const id in context.users) {
        if (context.users[id].user) {
          context.users[id].user = {
            ...context.users[id].user,
            score: 0,
            correct: undefined,
            correctTime: 0,
            first: false,
          };
        }
      }
      broadCast("start", t);
      context.nowQuestion = {
        qid: -1,
      };
    });
    ws.on("questionBegin", (q) => {
      context.nowQuestion.fst = undefined;
      for (const id in context.users) {
        if (context.users[id].user) {
          context.users[id].user = {
            ...context.users[id].user,
            correct: undefined,
            correctTime: 0,
            first: false,
          };
        }
      }
      context.nowQuestion.qid = q.q.id;
      broadCast("questionBegin", {
        q: {
          answer: {
            // Encrypted(?)
            answer: btoa(
              unescape(encodeURIComponent(JSON.stringify(q.q.answer))),
            ),
            short: "enc",
          },
          id: q.q.id,
          text: q.q.text,
        },
        t: q.t,
      });
    });
    ws.on("questionEnd", (q) => {
      const users: User[] = [];
      for (const id in context.users) {
        if (context.users[id].user) {
          if (
            context.users[id].user.correct
          ) {
            if (context.nowQuestion.fst?.uid === context.users[id].user.id) {
              context.users[id].user.score += POINT_1ST;
              context.users[id].user.first = true;
            }
            context.users[id].user.score += POINT_CORRECTED;
          } else if (context.users[id].user.correct === false) {
            if (context.users[id].user.score !== 0) {
              context.users[id].user.score += POINT_MISSED;
            }
          }
          users.push(context.users[id].user);
        }
      }
      users.sort((a, b) => a.score - b.score);
      context.nowQuestion.qid = -1;
      broadCast("questionEnd", { ...q, users });
    });
  });
  return response;
});

// WebSocketの作成
app.get("/ws/:id", (c) => {
  if (c.req.raw.headers.get("upgrade") !== "websocket") {
    return c.text("WebSocket only", 400);
  }
  const id = parseInt(c.req.param("id"));
  const { socket, response } = Deno.upgradeWebSocket(c.req.raw);
  createSocket(socket).then((ws) => {
    if (context.users[id]) {
      try {
        context.users[id].ws.ws.close();
      } catch {
      }
    }
    context.users[id] = { ws };
    ws.on("join", (user) => {
      context.users[id].user = user;
      broadCast("join", user);
    });

    ws.on("O", (e) => {
      if (context.nowQuestion.qid === e.qid) {
        context.users[e.uid].user = {
          ...context.users[e.uid].user!,
          correct: true,
          correctTime: e.t,
        };
        if ((context.nowQuestion?.fst?.t ?? Infinity) > e.t) {
          context.nowQuestion.fst = e;
        }
        broadCast("O", e);
      }
    });

    ws.on("X", (e) => {
      if (context.nowQuestion.qid === e.qid) {
        context.users[e.uid].user = {
          ...context.users[e.uid].user!,
          correct: false,
        };
        broadCast("X", e);
      }
    });

    ws.ws.onclose = () => {
      delete context.users[id];
      broadCast("leave", { uid: id });
    };
  });
  return response;
});

// ファイルを返す
app.use(
  "/*",
  serveStatic({
    getContent(path, c) {
      console.log(path);
      return fetch(import.meta.resolve("./page/" + path)).catch(() =>
        c.html(Deno.readTextFile("./page/index.html"), 200)
      );
    },
  }),
);

// 404ページ
app.notFound((c) => c.html(Deno.readTextFile("./page/index.html"), 200));

Deno.serve(app.fetch);
