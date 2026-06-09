import { SocketDataType, User } from "./types.ts";
import EventEmitter from "events";

type Events = { [P in keyof SocketDataType]: [SocketDataType[P]] }

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

export function createSocket(ws: WebSocket) {
    return new Promise<ClientSocket>((resolve, reject) => {
        ws.onopen = () => resolve(new ClientSocket(ws))
    })
}