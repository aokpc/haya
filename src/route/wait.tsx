/** @jsx h */
import { h } from "preact";
import { appContext } from "../app.tsx";
import { useJoined } from "../fetch.ts";
import { useEffect } from "preact/hooks";
import { User } from "../../types.ts";
import { route } from "preact-router";

// `/wait` にアクセスしたときの処理
export function Wait(params: { path: string }) {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>開始されるのを待っています</h2>
      <h2 style={{ textAlign: "center" }}>
        <span className="loader"></span>
      </h2>
      <UserList />
    </div>
  );
}

// ユーザー一覧を表示するコンポーネント
function UserList() {
  // ユーザー一覧を取得
  const [joined, setJoined] = useJoined();

  // WSイベントリスナーを登録
  useEffect(() => {
    if (!appContext.socket) {
      location.href = "/";
      return;
    }

    // ユーザーが参加したときの処理
    const f = (e: User) => {
      setJoined((previous) =>
        previous
          ? (previous.find((u) => u.id === e.id)) ? previous : [...previous, e]
          : [e]
      );
    };

    // ユーザーが退出したときの処理
    const f2 = ({ uid }: { uid: number }) => {
      setJoined((previous) =>
        previous ? [...previous.filter((u) => u.id !== uid)] : []
      );
    };

    // ゲームが開始されたときの処理
    const f3 = ({ t }: { t: number }) => {
      setTimeout(() => {
        route("/play", true);
      }, t - Date.now());
    };
    appContext.socket.on("join", f);
    appContext.socket.on("leave", f2);
    appContext.socket.on("start", f3);

    // クリーンアップ
    return () => {
      appContext.socket!.off("join", f);
      appContext.socket!.off("leave", f2);
      appContext.socket!.off("start", f3);
    };
  }, []);
  return (
    <div className="user-list-base">
      {/* ユーザー一覧を表示 reactの呪文で非同期処理 */}
      {joined
        ? joined.map((user) => (
          <div
            className="user-list-content"
            {...(user.id === appContext.i.id
              ? { style: { backgroundColor: "#f8f" } }
              : {})}
          >
            <img
              className="user-list-icon"
              src={`/icons/${user.id}`}
              alt={user.name}
            />
            <div className="user-list-name">{user.name}</div>
          </div>
        ))
        : ""}
    </div>
  );
}
