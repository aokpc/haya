/** @jsx h */
import { h, render } from "preact";
import { ClientSocket } from "../socket.ts";
import { useJoined } from "../fetch.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import { Question, User } from "../../types.ts";
import { adminws } from "../admin.tsx";

// ゲーム開始画面
export function Setting() {
  // ステップ
  // 0: csv選択
  // 1: csv選択後
  // 2: 問題開始
  // 3: 問題中
  // 4: 終了
  const [step, setStep] = useState<number>(0);
  // 現在の問題
  const [currentQ, setCurrentQ] = useState<number>(-1);
  // csvファイル選択
  const fileRef = useRef<HTMLInputElement>(null);
  // csvファイル名state
  const [fileName, setFileName] = useState<string>("");
  // csvパース結果
  const qRef = useRef<Question[]>([]);
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Setting</h3>
      <div className="admin-settings">
        {step === 0
          ? (
            <label class="csv-label">
              <input
                ref={fileRef}
                type="file"
                className="file-input"
                accept=".csv"
                onInput={async (e) => {
                  if (!fileRef.current || !fileRef.current.files) {
                    return;
                  }
                  qRef.current = parseCsv(
                    await fileRef.current.files[0].text(),
                  );
                  setFileName(fileRef.current.files[0].name);
                  setStep(1);
                }}
              />
              問題リスト(csv)を選択
            </label>
          )
          : step === 1
          ? (
            <p style={{ textAlign: "center" }} onClick={() => setStep(0)}>
              {fileName}
            </p>
          )
          : ""}
        {step === 1
          ? (
            <div>
              <Questions questions={qRef.current} />
              <button
                className="admin-button"
                type="button"
                onClick={() => {
                  if (!confirm("この設定でクイズを開始しますか？")) {
                    return;
                  }
                  adminws.send("start", { t: Date.now() + 1000 });
                  setStep(2);
                }}
              >
                クイズを開始
              </button>
            </div>
          )
          : ""}
        {step === 2 || step === 3
          ? (
            <div>
              <Questions questions={qRef.current} current={currentQ} />
              {step === 3
                ? (
                  <button
                    className="admin-button"
                    type="button"
                    onClick={() => {
                      adminws.send("questionEnd", {
                        users: [],
                        id: currentQ,
                        t: Date.now() + 1000,
                      });
                      if (currentQ === qRef.current.length - 1) {
                        setStep(4);
                        return;
                      }
                      setStep(2);
                    }}
                  >
                    この問題を終了
                  </button>
                )
                : (
                  <button
                    className="admin-button"
                    type="button"
                    onClick={() => {
                      adminws.send("questionBegin", {
                        q: qRef.current[currentQ + 1],
                        t: Date.now() + 1000,
                      });
                      setCurrentQ(currentQ + 1);
                      setStep(3);
                    }}
                  >
                    次の問題を開始
                  </button>
                )}
            </div>
          )
          : ""}
        {step === 4
          ? (
            <button
              className="admin-button"
              type="button"
              onClick={() => {
                adminws.send("end", {
                  users: [],
                });
                setCurrentQ(currentQ + 1);
                location.reload();
              }}
            >
              クイズを終了
            </button>
          )
          : ""}
      </div>
    </div>
  );
}

function Questions(param: { questions: Question[]; current?: number }) {
  return (
    <div className="csv-list-base">
      <div className="csv-list-row" style={{ backgroundColor: "#aff" }}>
        <div className="csv-list-text">問題文</div>
        <div className="csv-list-answer">解答</div>
        <div className="csv-list-answer">かいとう</div>
      </div>
      {param.questions.map((q, i) => (
        <div
          key={q.id}
          className={param.current === i
            ? "csv-list-row -current"
            : "csv-list-row"}
        >
          <div className="csv-list-text">{q.text}</div>
          <div className="csv-list-answer">{q.answer.answer}</div>
          <div className="csv-list-answer">{q.answer.short}</div>
        </div>
      ))}
    </div>
  );
}

function parseCsv(param: string): Question[] {
  const lines = param.split("\n");
  const res: Question[] = [];
  let i = 0;
  for (const line of lines) {
    if (!line) {
      continue;
    }
    if (i === 0) {
      i++;
      continue;
    }
    const [text, short, answer] = line.split(",");
    res.push({ text, answer: { answer, short }, id: res.length });
    i++;
  }
  return res;
}
