/** @jsx h */
import { h, render } from "preact";
import { ClientSocket } from "./socket.ts";
import { useJoined } from "./fetch.ts";
import { useEffect, useState } from "preact/hooks";
import { User } from "../types.ts";
import { UserList } from "./admin/userlist.tsx";
import { Setting } from "./admin/setting.tsx";


render(<App />, document.body);

export const adminws = new ClientSocket(new WebSocket("/ws-admin"));

function App() {
  const [error, setError] = useState<string>("");
  useEffect(() => {
    adminws.ws.addEventListener("error", (e) => {
      setError(e.toString());
    });
    adminws.ws.addEventListener("close", (e) => {
      setError("接続が切断されました");
    });
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Admin</h1>
      {error
        ? <h3 style={{ textAlign: "center", color: "#f00" }}>{error}</h3>
        : ""}
      <h3 style={{ textAlign: "center" }}>参加中のユーザー</h3>
      <UserList />
      <Setting />
    </div>
  );
}
