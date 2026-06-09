/** @jsx h */
import { h } from "preact";
import { Router } from "preact-router";
import { Root } from "./route/root.tsx";
import { Start } from "./route/start.tsx";
import { Wait } from "./route/wait.tsx";
import { Play } from "./route/play.tsx";
import { End } from "./route/end.tsx";

import { AppContext } from "../types.ts";

// AppContext データ保存用
export const appContext: AppContext = {
  nowQid: -1,
  i: { id: Math.floor(Math.random() * (2 ** 32)), name: "_none", score: -1 },
};

export function App() {
  return (
    <Router>
      <Root path="/" />
      <Start path="/start" />
      <Wait path="/wait" />
      <Play path="/play" />
      <End path="/end" />
    </Router>
  );
}
