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
        try {
            let x1 = a.x2 || a.x;
            let y1 = a.y2 || a.y;
            let x2 = b.x2 || b.x;
            let y2 = b.y2 || b.y;

            return Math.hypot(y1 - y2, x1 - x2);
        } catch (e) {}
    }

    static getDirection(a, b) {
        let x1 = a.x2 || a.x;
        let y1 = a.y2 || a.y;
        let x2 = b.x2 || b.x;
        let y2 = b.y2 || b.y;

        return Math.atan2(y1 - y2, x1 - x2);
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

    static kFormat(num) {
        if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + "kk";
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + "k";
        } else {
            return num;
        }
    }

    static randFloat(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
}

export default UTILS;