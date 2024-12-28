import Packets from "../constants/Packets.js";
import joinGame from "../Events/joinGame.js";

export default class ServerPacketManager {
    static eventMap = new Map([
        [Packets.CLIENT_TO_SERVER.JOIN_GAME, joinGame]
    ]);

    static handle(ws, type, data) {
        if (typeof ws !== "object") throw new Error("first argument is not an object");
        if (typeof type !== "string") throw new Error("second argument is not a string");
        if (typeof data !== "object") throw new Error("third argument is not an object");

        let eventHandler = this.eventMap.get(type);

        if (eventHandler) {
            eventHandler(ws, ...data);
        }
    }
}