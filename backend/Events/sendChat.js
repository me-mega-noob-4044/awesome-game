import { players } from "../../index.js";
import Packets from "../constants/Packets.js";

export default function sendChat(ws, msg) {
    msg = msg.slice(0, 100);

    for (let i = 0; i < players.length; i++) {
        let player = players[i];

        if (player && ws.NEW_CLIENT.canSee(player)) {
            player.send(Packets.SERVER_TO_CLIENT.GET_CHAT, ws.NEW_CLIENT.sid, msg);
        }
    }
}