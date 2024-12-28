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

    static getDistance(a, b) {
        return Math.hypot((b.x2 || a.x) - (b.x2 || b.x), (a.y2 || a.y) - (b.y2 || b.y));
    }

    static getDirection(a, b) {
        return Math.atan2((b.x2 || a.x) - (b.x2 || b.x), (a.y2 || a.y) - (b.y2 || b.y));
    }

    static randString(length) {
        let result = [];
    
        for (let i = 0; i < length; i++) result.push(letters[Math.floor(Math.random() * letters.length)]);
    
        return result.join("");
    }

    static randInt(min, max) {
        return (Math.random() * (max - min + 1)) + min;
    }

    static getAngleDist(a, b) {
        let p = Math.abs(b - a) % (Math.PI * 2);
        return (p > Math.PI ? (Math.PI * 2) - p : p);
    }
}

export default UTILS;