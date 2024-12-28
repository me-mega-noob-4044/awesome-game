import { encode, decode } from "msgpack-lite";

const letters = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM";

class UTILS {
    static decodeMessage(msg) {
        let parsed = decode(new Uint8Array(msg));

        return [parsed[0], parsed[1]];
    }

    static encodeMessage(type, ...args) {
        let binary = encode([type, args]);

        return binary;
    }

    static randString(length) {
        let result = [];
    
        for (let i = 0; i < length; i++) result.push(letters[Math.floor(Math.random() * letters.length)]);
    
        return result.join("");
    }

    static randInt(min, max) {
        return (Math.random() * (max - min + 1)) + min;
    }
}

export default UTILS;