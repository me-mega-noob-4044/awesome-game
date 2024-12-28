import { encode, decode } from "msgpack-lite";

class UTILS {
    static decodeMessage(msg) {
        let parsed = decode(new Uint8Array(msg));

        return [parsed[0], parsed[1]];
    }

    static encodeMessage(type, ...args) {
        let binary = encode([type, args]);

        return binary;
    }
}

export default UTILS;