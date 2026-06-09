/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Button } from "./svgs.tsx";
export function Dev() {
  const [state, setState] = useState(false);
  useEffect(() => {
    const f = () => setState(true);
    const f2 = () => setState(false);
    document.addEventListener("keydown", f);
    document.addEventListener("keyup", f2);
    return () => {
      document.removeEventListener("keydown", f);
      document.removeEventListener("keyup", f2);
    };
  }, []);
  return (
    <div
      onPointerDown={() => {
        setState(true);
      }}
      onPointerUp={() => {
        setState(false);
      }}
    >
      <Button press={state}></Button>
    </div>
  );
}
