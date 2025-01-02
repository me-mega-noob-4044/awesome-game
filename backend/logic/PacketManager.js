import Packets from "../constants/Packets.js";
import getAttack from "../Events/getAttack.js";
import joinGame from "../Events/joinGame.js";
import sendChat from "../Events/sendChat.js";
import sendHit from "../Events/sendHit.js";
import sendUpgrade from "../Events/sendUpgrade.js";
import socketPing from "../Events/socketPing.js";
import updateDirection from "../Events/updateDirection.js";
import updateMovement from "../Events/updateMovement.js";

export default class ServerPacketManager {
    static eventMap = new Map([
        [Packets.CLIENT_TO_SERVER.JOIN_GAME, joinGame],
        [Packets.CLIENT_TO_SERVER.MOVE, updateMovement],
        [Packets.CLIENT_TO_SERVER.SEND_CHAT, sendChat],
        [Packets.CLIENT_TO_SERVER.SEND_HIT, sendHit],
        [Packets.CLIENT_TO_SERVER.PING, socketPing],
        [Packets.CLIENT_TO_SERVER.SEND_AIM, updateDirection],
        [Packets.CLIENT_TO_SERVER.SEND_UPGRADE, sendUpgrade],
        [Packets.CLIENT_TO_SERVER.SEND_ATTACK, getAttack]
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