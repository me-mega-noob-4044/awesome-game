import { players } from "../../index.js";
import Packets from "../constants/Packets.js";

export default function sendChat(ws, msg) {
    for (let i = 0; i < players.length; i++) {
        let player = player[i];

        if (player && ws.NEW_CLIENT.canSee(player)) {
            player.send(Packets.SERVER_TO_CLIENT.GET_CHAT, ws.NEW_CLIENT.sid, msg);
        }
    }
}