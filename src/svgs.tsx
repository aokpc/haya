/** @jsx h */
import { h } from "preact";

// ボタンコンポーネント svgでボタンを描画

export function Button(params: { press?: boolean }) {
  return (params.press
    ? (
      <svg style={{ width: "200px", height: "200px" }} viewBox="0 0 52 52">
        <path
          fill="#9c8e68"
          d="M5.5 24.5 5.5 34.5A20 10 1 1045.5 34.5L45.5 24.5Z"
        >
        </path>
        <path
          fill="#ffedba"
          d="M20 15A20 10 1 1030 15Z"
        >
        </path>
        <path
          fill="#a8480c"
          d="M14 24.5A10 5 0 0036 24.5L36 20a10 5 0 01-22 0z"
        >
        </path>
        <path
          fill="#f06916"
          d="M14 20.1A10 5 0 0136 20.1Z"
        >
        </path>
        <path
          fill="#f06916"
          d="M14 20A10 5 0 0036 20L14 20Z"
        >
        </path>
      </svg>
    )
    : (
      <svg style={{ width: "200px", height: "200px" }} viewBox="0 0 52 52">
        <path
          fill="#9c8e68"
          d="M5.5 24.5 5.5 34.5A20 10 1 1045.5 34.5L45.5 24.5Z"
        >
        </path>
        <path
          fill="#ffedba"
          d="M20 15A20 10 1 1030 15Z"
        >
        </path>
        <path
          fill="#a8480c"
          d="M14 24.5A10 5 0 0036 24.5L36 18A10 5 0 0114 18Z"
        >
        </path>
        <path
          fill="#f06916"
          d="M14 18.1A10 5 0 0136 18.1Z"
        >
        </path>
        <path
          fill="#f06916"
          d="M14 18A10 5 0 0036 18M14 18Z"
        >
        </path>
      </svg>
    ));
}

export function O() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="#f11"
        d="M3 12M0 12A1 1 0 0024 12 1 1 0 000 12M3 12A1 1 0 0121 12 1 1 0 013 12Z"
      />
    </svg>
  );
}

export function X() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="#11f"
        d="M3 0 0 3 9 12 0 21 3 24 12 15 21 24 24 21 15 12 24 3 21 0 12 9Z"
      />
    </svg>
  );
}
