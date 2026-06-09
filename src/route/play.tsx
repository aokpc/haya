/** @jsx h */
import { h, RefObject } from "preact";
import { appContext } from "../app.tsx";
import { Button, O, X } from "../svgs.tsx";
import { omit, useJoined } from "../fetch.ts";
import {
  Dispatch,
  StateUpdater,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";
import { Answer, User } from "../../types.ts";
import { route } from "preact-router";

type OverParam =
  | {
    t: "select";
    onAnsSelect: (input: string) => void;
    selects: string[];
    ans: string;
  }
  | { t: "result"; correct: boolean }
  | { t: "title"; qid: number }
  | { t?: undefined };

// インターバルを使って、問題文を表示する
let intervalF: (() => void) | undefined;
setInterval(() => {
  if (!intervalF) {
    return;
  }
  try {
    intervalF();
  } catch {}
}, 100);

export function Play(params: { path: string }) {
  // ログイン強制
  if (!appContext.socket) {
    location.href = "/";
    return;
  }

  const setUserRef = useRef<Dispatch<StateUpdater<User[] | null>>>(null);
  const [answer, setAnswer] = useState({ ans: "", short: "" });
  const [q, setQ] = useState("");
  const [overParam, setOverParam] = useState<OverParam>({});
  const [press, setPress] = useState(false);

  useEffect(() => {
    appContext.socket?.on("leave", ({ uid }) => {
      setUserRef.current &&
        setUserRef.current((users) =>
          users && users.filter((u) => u.id !== uid)
        );
    });
    appContext.socket?.on("O", ({ uid, qid, t }) => {
      if (appContext.nowQid !== qid) {
        return;
      }
      setUserRef.current &&
        setUserRef.current((users) =>
          users &&
          users.map((u) =>
            u.id === uid ? { ...u, correct: true, correctTime: t } : u
          )
        );
    });
    appContext.socket?.on("X", ({ uid, qid }) => {
      if (appContext.nowQid !== qid) {
        return;
      }
      setUserRef.current &&
        setUserRef.current((users) =>
          users &&
          users.map((u) => u.id === uid ? u : { ...u, correct: false })
        );
    });
    appContext.socket?.on("end", () => {
      route("/end");
    });
    appContext.socket?.on("questionBegin", (e) => {
      // 問題文を表示するためのインターバル
      setTimeout(() => {
        setOverParam({});
        // 回答を消去
        setAnswer({ ans: "", short: "" });
        // 問題文を入れるvar
        let qstr = "";
        // 問題文を表示する
        intervalF = () => {
          if ((appContext.q?.id ?? 0) !== e.q.id) {
            // 問題が変わったらインターバルを止める
            intervalF = undefined;
            return;
          }
          if (qstr.length < appContext.q!.text.length) {
            // 文字を1文字ずつ表示する
            qstr = qstr + appContext.q!.text[qstr.length];
            setQ(qstr);
          } else {
            // 問題文が表示されたらインターバルを止める
            intervalF = undefined;
          }
        };
      }, e.t - Date.now() + 500);
      setTimeout(() => {
        setOverParam({
          t: "title",
          qid: e.q.id,
        });
      }, e.t - Date.now());

      appContext.q = {
        ...e.q,
        answer: JSON.parse(decodeURIComponent(escape(atob(e.q.answer.answer)))),
      };
      appContext.nowQid = e.q.id;
      setUserRef.current!((users) =>
        users &&
        users.map((u) => ({
          ...u,
          correct: undefined,
          correctTime: 0,
          first: false,
        }))
      );
    });
    appContext.socket?.on("questionEnd", ({ id, users }) => {
      if (appContext.nowQid !== id) {
        return;
      }
      appContext.nowQid = -1;
      setPress(false);
      setOverParam({});
      setQ(appContext.q!.text);
      setUserRef.current!(users);
      setAnswer({
        ans: appContext.q!.answer.answer,
        short: appContext.q!.answer.short,
      });
    });
  }, []);

  useEffect(() => {
    const onkeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        if (appContext.nowQid === -1) {
          return;
        }
        if (overParam.t) {
          return;
        }
        setPress(true);
        startAnswer(setOverParam);
      }
    };
    document.addEventListener("keydown", onkeydown);
    return () => {
      document.removeEventListener("keydown", onkeydown);
    };
  }, [overParam]);

  return (
    <div className="play">
      {
        /*
      <Over
        t="result"
        correct={true}
      />
      <Over
        t="select"
        selects={["a", "b", "c", "d"]}
        onSelect={(input) => {}}
      />
      */
      }
      <Over {...overParam} />
      <Header q={appContext.nowQid} userRef={setUserRef} />
      <QBody
        text={q}
        answer={answer}
      />
      <QButton
        {...{ press }}
        onClick={() => {
          if (appContext.nowQid === -1) {
            return;
          }
          setPress(true);
          startAnswer(setOverParam);
        }}
      />
    </div>
  );
}

function Over(
  params:
    & h.JSX.HTMLAttributes<HTMLDivElement>
    & OverParam,
) {
  useEffect(() => {
    if (params.t === "select") {
      const onkeydown = (e: KeyboardEvent) => {
        if (e.key === "1") {
          params.onAnsSelect(params.selects[0]);
        } else if (e.key === "2") {
          params.onAnsSelect(params.selects[1]);
        } else if (e.key === "3") {
          params.onAnsSelect(params.selects[2]);
        } else if (e.key === "4") {
          params.onAnsSelect(params.selects[3]);
        }
      };
      document.addEventListener("keydown", onkeydown);
      return () => {
        document.removeEventListener("keydown", onkeydown);
      };
    }
  }, [params]);
  return (
    <div
      {...omit(params, ["t", "onSelect", "selects", "correct"] as any)}
      className={params.t ? "over show" : "over"}
    >
      {params.t === "title" && (
        <div className="qtitle">
          第{params.qid + 1}問
        </div>
      )}
      {params.t === "select" && (
        <div>
          <div className="inputPopup">
            <div className="title">解答中...</div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img className="icon" src={`/icons/${appContext.i.id}`}></img>
              <div className="text">{params.ans || appContext.i.name}</div>
            </div>
          </div>
          <div className="selects">
            {params.selects.map((s) => (
              <div
                className="select"
                onClick={() => {
                  params.onAnsSelect(s);
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
      {params.t === "result" && (
        params.correct
          ? (
            <div className="result">
              <O />
            </div>
          )
          : (
            <div className="result">
              <X />
            </div>
          )
      )}
    </div>
  );
}

function QButton(
  params: h.JSX.HTMLAttributes<HTMLDivElement> & { press?: boolean },
) {
  return (
    <div {...omit(params, ["press"])} className="qbutton">
      <Button {...params} />
    </div>
  );
}

function QBody(
  param: { text: string; answer?: { ans?: string; short?: string } },
) {
  return (
    <div className="qbody">
      <div className="question">
        <div style={{ marginRight: "3px" }}>Q.</div>
        <div>
          {param.text}
        </div>
      </div>
      <div className="answer">
        {param.answer?.ans &&
          (
            <div>
              <div className="ans">
                A. {param.answer.ans}
              </div>
              <div className="short">
                {param.answer.short}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

function Header(
  params: {
    q: number;
    userRef: RefObject<Dispatch<StateUpdater<User[] | null>>>;
  },
) {
  return (
    <div className="header">
      <div className="title">Q{params.q > -1 ? params.q + 1 : ""}</div>
      <UserList userRef={params.userRef} />
    </div>
  );
}

function UserList(
  param: { userRef: RefObject<Dispatch<StateUpdater<User[] | null>>> },
) {
  const [users, setUsers] = useJoined();
  param.userRef.current = setUsers;
  return (
    <div className="users">
      {users && users.map((u) => (
        <div className="user">
          {typeof u.first === "boolean" && u.first && (
            <div className="first">1st</div>
          )}
          {typeof u.correct === "boolean" && (u.correct
            ? (
              <div className="correct">
                <O />
              </div>
            )
            : (
              <div className="correct">
                <X />
              </div>
            ))}
          <img className="icon" src={`/icons/${u.id}`}></img>
          <div className="name">{u.name.substring(0, 8)}</div>
          <div className="score">{u.score}</div>
        </div>
      ))}
    </div>
  );
}

const regExp = {
  hiragana: /[ぁ-んー]/,
  katakana: /[ァ-ヶー]/,
  alphabet: /[A-Z]/,
  number: /[0-9]/,
};
const strings = {
  hiragana:
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんー",
  katakana:
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンー",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
};
// 問題の選択肢を生成
function generateOptions(ans: string): string[] {
  const options: string[] = [ans];
  if (regExp.hiragana.test(ans)) {
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * strings.hiragana.length);
      const randomChar = strings.hiragana[randomIndex];
      if (options.includes(randomChar)) {
        i--;
        continue;
      }
      options.push(randomChar);
    }
  } else if (regExp.katakana.test(ans)) {
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * strings.katakana.length);
      const randomChar = strings.katakana[randomIndex];
      if (options.includes(randomChar)) {
        i--;
        continue;
      }
      options.push(randomChar);
    }
  } else if (regExp.alphabet.test(ans)) {
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * strings.alphabet.length);
      const randomChar = strings.alphabet[randomIndex];
      if (options.includes(randomChar)) {
        i--;
        continue;
      }
      options.push(randomChar);
    }
  } else {
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * strings.number.length);
      const randomChar = strings.number[randomIndex];
      if (options.includes(randomChar)) {
        i--;
        continue;
      }
      options.push(randomChar);
    }
  }
  return options.sort(() => Math.random() - 0.5);
}

function startAnswer(
  setOverParam: Dispatch<StateUpdater<OverParam>>,
) {
  intervalF = undefined;
  const ans = appContext.q!.answer.short;
  let i = -1;
  const onAnsSelect = (input: string | null) => {
    if (input !== null && input !== ans[i]) {
      setOverParam({
        t: "result",
        correct: false,
      });
      appContext.socket?.send("X", {
        qid: appContext.nowQid,
        uid: appContext.i.id,
      });
      return;
    }
    if ((i + 1) === ans.length) {
      setOverParam({
        t: "result",
        correct: true,
      });
      appContext.socket?.send("O", {
        qid: appContext.nowQid,
        uid: appContext.i.id,
        t: Date.now(),
      });
      return;
    }
    i++;
    const options = generateOptions(ans[i]);
    setOverParam({
      t: "select",
      selects: options,
      onAnsSelect,
      ans: ans.substring(0, i),
    });
  };
  onAnsSelect(null);
}
