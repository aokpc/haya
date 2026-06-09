import { Dispatch, useEffect, useState, StateUpdater } from "preact/hooks";
import { User } from "../types.ts";

// ユーザー一覧を取得する
export function useJoined(): [User[] | null, Dispatch<StateUpdater<User[] | null>>] {
    const [joined, setJoined] = useState<User[] | null>(null);
    useEffect(() => {
        (async () => {
            const res = await fetch("/joined");
            setJoined(await res.json())
        })();
    }, []);
    return [joined, setJoined];
}

export function omit<T, K extends keyof T>(params: T, keys: K[]): Omit<T, K> {
    const newObj = { ...params };
    for (const key of keys) {
        delete newObj[key]
    }
    return newObj
}