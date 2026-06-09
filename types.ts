import type { ClientSocket } from "./src/socket.ts";

export const POINT_CORRECTED = 10;
export const POINT_1ST = 30;

export const POINT_MISSED = -10;

// WebSocketのデータ型
export interface SocketDataType {
  join: User;
  leave: { uid: number };
  start: { t: number };
  end: {
    users: User[];
  };
  O: { t: number; uid: number; qid: number };
  X: { uid: number; qid: number };
  questionBegin: {
    q: Question;
    t: number;
  };
  questionEnd: {
    users: User[];
    id: number;
    t: number;
  };
}

// 問題
export interface Question {
  id: number;
  text: string;
  answer: Answer;
}

// 答え
export type Answer = {
  answer: string;
  short: string;
};

// ユーザー
export interface User {
  id: number;
  name: string;
  score: number;
  correct?: boolean;
  correctTime?: number;
  first?: boolean;
}

// データ保存
export interface AppContext {
  i: User;
  q?: Question;
  nowQid: number;
  socket?: ClientSocket;
}

export interface ServerContext {
  users: Record<number, { user?: User; ws: ClientSocket }>;
  admin?: ClientSocket;
  icons: Record<string, string>;
  nowQuestion: {
    qid: number;
    fst?: { uid: number; t: number };
  };
}
