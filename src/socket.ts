import { SocketDataType, User } from "../types.ts";
import { EventEmitter } from "events";

// WebSocketのイベント名とデータ型の対応
type Events = { [P in keyof SocketDataType]: [SocketDataType[P]] }

// WebSocketの作成
export function createSocket(path: string) {
    const ws = new WebSocket(path)
    return new Promise<WebSocket>((resolve, reject) => {
        ws.onopen = () => resolve(ws)
    })
}

// WebSocketのクライアント
export class ClientSocket extends EventEmitter<Events> {
    id?: number
    constructor(public ws: WebSocket) {
        super();
        ws.addEventListener("message", (m) => {
            const [name, value] = JSON.parse(m.data)
            this.emit(name, value)
        })
    }
    send<K extends keyof SocketDataType>(name: K, value: SocketDataType[K]) {
        this.ws.send(JSON.stringify([name, value]))
    }
}
