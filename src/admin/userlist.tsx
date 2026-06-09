/** @jsx h */
import { h, render } from "preact";
import { ClientSocket } from "../socket.ts";
import { useJoined } from "../fetch.ts";
import { useEffect, useState } from "preact/hooks";
import { User } from "../../types.ts";
import { adminws } from "../admin.tsx";

// ユーザー一覧を表示するコンポーネント
export function UserList() {
  // ユーザー一覧を取得
  const [joined, setJoined] = useJoined();

  // WSイベントリスナーを登録
  useEffect(() => {
    // ユーザーが参加したときの処理
    const handleUserJoin = (e: User) => {
      setJoined((previous) =>
        previous
          ? (previous.find((u) => u.id === e.id)) ? previous : [...previous, e]
          : [e]
      );
    };

    // ユーザーが退出したときの処理
    const handleUserLeave = ({ uid }: { uid: number }) => {
      console.log("leave", uid);
      setJoined((previous) =>
        previous ? [...previous.filter((u) => u.id !== uid)] : []
      );
    };

    // ユーザーが正解したときの処理
    const handleUserCorrect = (e: { uid: number }) => {
      setJoined((previous) =>
        previous
          ? previous.map((u) => u.id === e.uid ? { ...u, correct: true } : u)
          : []
      );
    };

    // ユーザーが不正解だったときの処理
    const handleUserIncorrect = (e: { uid: number }) => {
      setJoined((previous) =>
        previous
          ? previous.map((u) => u.id === e.uid ? { ...u, correct: false } : u)
          : []
      );
    };

    // 問題が開始されたとき、ユーザーの正解不正解をリセット
    const handleQuestionBegin = () => {
      setJoined((previous) =>
        previous ? previous.map((u) => ({ ...u, correct: undefined })) : []
      );
    };

    // 問題が終了したとき、ユーザーのスコアを更新
    const handleQuestionEnd = ({ users }: { users: User[] }) => {
      setJoined(users);
    };

    // イベントリスナーを登録
    adminws.on("join", handleUserJoin);
    adminws.on("leave", handleUserLeave);
    adminws.on("O", handleUserCorrect);
    adminws.on("X", handleUserIncorrect);
    adminws.on("questionBegin", handleQuestionBegin);
    adminws.on("questionEnd", handleQuestionEnd);

    // クリーンアップ
    return () => {
      adminws.off("join", handleUserJoin);
      adminws.off("leave", handleUserLeave);
      adminws.off("O", handleUserCorrect);
      adminws.off("X", handleUserIncorrect);
      adminws.off("questionBegin", handleQuestionBegin);
      adminws.off("questionEnd", handleQuestionEnd);
    };
  }, []);
  return (
    <div className="user-list-base" style={{ height: "300px" }}>
      {/* ユーザー一覧を表示 reactの呪文で非同期処理 */}
      {joined
        ? joined.map((user) => (
          <div className="user-list-content">
            <img
              className="user-list-icon"
              src={`/icons/${user.id}`}
              alt={user.name}
            />
            <div className="user-list-name">
              {user.name}
              <span style={{ color: "#0ff", marginLeft: "10px" }}>
                {user.score}
              </span>
              {typeof user.correct === "boolean"
                ? (
                  <span style={{ color: "#f0f", marginLeft: "10px" }}>
                    {user.correct ? "○" : "×"}
                  </span>
                )
                : ""}
              {user.first
                ? <span style={{ color: "#ff0", marginLeft: "10px" }}>1st</span>
                : ""}
            </div>
          </div>
        ))
        : ""}
    </div>
  );
}
