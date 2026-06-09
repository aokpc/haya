/** @jsx h */
import { h } from "preact";
import { route } from "preact-router";

export function Root(params: { path: string }) {
  return (
    <div>
      {
        /*
        <h2 style={{ textAlign: "center" }}>
        2025 物理部夏合宿
      </h2>
      <h3 style={{ textAlign: "center" }}>
        クイズ大会
      </h3>
      */
      }
      <img style={{ width: "100vw" }} src="/assets/min.jpeg"></img>
      <h2 style={{ margin: "0px", textAlign: "center" }}>
        <a href="" onClick={() => route("/start", true)}>{">>>続ける"}</a>
      </h2>
    </div>
  );
}
