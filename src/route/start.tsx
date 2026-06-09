/** @jsx h */
import { h } from "preact";
import { useRef, useState } from "preact/hooks";
import { route } from "preact-router";
import { appContext } from "../app.tsx";
import * as _imageCompression from "browser-image-compression";
import { ClientSocket, createSocket } from "../socket.ts";

// 画像圧縮ライブラリの型定義がないのでanyで無理やり型を合わせる
const imageCompression = _imageCompression.default as any as (
  file: File,
  opt: _imageCompression.Options,
) => Promise<File>;

// /start にアクセスしたときの処理
export function Start(params: { path: string }) {
  // refを使ってDOM要素を取得
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // アイコン画像のBlobを保持するためのref
  const imgRef = useRef<Blob>(null);
  // エラーメッセージと画像のURLを保持するためのstate
  const [error, setError] = useState<string>("");
  const [img, setImg] = useState<string>("");
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        名前を入力
      </h2>
      <input
        ref={inputRef}
        type="text"
        className="name-input"
        placeholder="ナマエ"
      />
      <label class="file-label">
        <input
          ref={fileRef}
          type="file"
          className="file-input"
          accept="image/*"
          onInput={async (e) => {
            // 画像を選択したときの処理
            if (!fileRef.current || !fileRef.current.files) {
              return;
            }
            // 待機メッセージを表示
            setError("画像を処理中...");
            // 画像を圧縮
            const blob = await imageCompression(
              fileRef.current?.files[0],
              {
                maxWidthOrHeight: 240,
                libURL: "/browser-image-compression.js",
              },
            );
            // 前の画像を消去
            img && URL.revokeObjectURL(img);
            // Blobを保存
            imgRef.current = blob;
            // 画像を表示
            setImg(URL.createObjectURL(blob));
            // メッセージを消去
            setError("");
          }}
        />
        アイコン画像を選択
      </label>
      {error
        ? (
          <h2 style={{ textAlign: "center", color: "#f00" }}>
            {error}
          </h2>
        )
        : ""}
      {img
        ? (
          <h2 style={{ textAlign: "center" }}>
            <img
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
              src={img}
              alt="icon"
            />
          </h2>
        )
        : ""}
      <h2 style={{ margin: "0px", textAlign: "center" }}>
        <a
          href=""
          onClick={async (e) => {
            // クリックしたときの処理
            e.preventDefault();
            const val = inputRef.current?.value;
            // 名前が入力されているか確認
            if (!val) {
              return setError("エラーが発生しました");
            }
            // 名前に禁止ワードが含まれていないか確認
            if (
              val.includes("ふか") || val.includes("フカ") ||
              val.includes("深") || val.includes("<")
            ) {
              return setError("エラーが発生しました");
            }

            // 名前を保存
            appContext.i.name = val.substring(0, 8);
            // 画像をアップロード
            const upload = await fetch("/icons/" + appContext.i.id, {
              body: imgRef.current ?? await createDefaultIcon(),
              method: "POST",
            });
            // エラーチェック
            if (!upload.ok) {
              return setError("エラーが発生しました");
            }
            // ソケットを作成
            appContext.socket = new ClientSocket(
              await createSocket("/ws/" + appContext.i.id),
            );
            // ソケットに名前を送信
            appContext.socket.send("join", appContext.i);
            route("/wait", true);
          }}
        >
          {">>>続ける"}
        </a>
      </h2>
    </div>
  );
}
const createDefaultIcon = async () =>
  await imageCompression(
    new File(
      [await (await fetch("/ico.png")).blob()],
      "ico.png",
      { type: "image/png" },
    ),
    {
      maxWidthOrHeight: 240,
      libURL: "/browser-image-compression.js",
    },
  );
