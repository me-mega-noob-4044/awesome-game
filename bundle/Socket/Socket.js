import { encode, decode } from "msgpack-lite";

class Socket extends WebSocket {
    constructor(url, protocols) {
        super(url, protocols);
    }
}