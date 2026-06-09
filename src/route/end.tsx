/** @jsx h */
import { h } from "preact";
import { appContext } from "../app.tsx";
import { useJoined } from "../fetch.ts";
import { useEffect, useState } from "preact/hooks";
import { User } from "../../types.ts";
import { route } from "preact-router";

// `/end` にアクセスしたときの処理
export function End(params: { path: string }) {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>結果発表</h2>
      <UserList />
      <h2 style={{ textAlign: "center" }}>
        <button
          type="button"
          className="admin-button"
          onClick={() => {
            route("/", true);
          }}
        >
          戻る
        </button>
      </h2>
    </div>
  );
}

// ユーザー一覧を表示するコンポーネント
function UserList() {
  // ユーザー一覧を取得
  const [joined, setJoined] = useJoined();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!joined) {
      return;
    }
    const _joined = joined.sort((a, b) => a.score - b.score);
    const id = setInterval(() => {
      setUsers((u) => {
        if (u.length < _joined.length) {
          return [_joined[u.length], ...u];
        }
        clearInterval(id);
        appContext.socket?.ws.close();
        return u;
      });
    }, 250);
    return () => clearInterval(id);
  }, [joined]);

  return (
    <div className="user-list-base">
      {/* ユーザー一覧を表示 reactの呪文で非同期処理 */}
      {users.length
        ? users.map((user) => (
          <div
            className="user-list-content"
            style={{ backgroundColor: "#fff", border: "2px solid" }}
          >
            <img
              className="user-list-icon"
              src={`/icons/${user.id}`}
              alt={user.name}
            />
            <div className="user-list-name">
              {user.name}
              <span
                style={{
                  color: "#fd5",
                  display: "inline-block",
                  marginLeft: "20px",
                }}
              >
                {user.score}
              </span>
            </div>
          </div>
        ))
        : ""}
    </div>
  );
}
