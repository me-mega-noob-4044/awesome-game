import { players } from "../../index.js";
import Packets from "../constants/Packets.js";

export default function sendChat(ws, msg) {
    msg = msg.slice(0, 100).replace(/[^a-zA-Z0-9 ,.!?'-]/g, "");
    
    if (!msg) return;

    if (msg == `!pass ${process.env.admin_password}`) {
        ws.isAdmin = true;
        return;
    } else if (ws.isAdmin && msg.startsWith("!")) {
        if (msg.startsWith("!kick ")) {
            let player = players.find(e => e.sid == parseInt(msg.split("!kick ")[1]));
            if (player) player.ws.close(4001, "You have been kicked");
        } else if (msg == "!xp") {
            ws.NEW_CLIENT.addXP(2e3);
        }
    } else if (msg.startsWith("!tp ")) {
        let player = players.find(e => e.sid == parseInt(msg.split("!tp ")[1]));
        if (player) {
            ws.NEW_CLIENT.x = player.x;
            ws.NEW_CLIENT.y = player.y;
        }
    }

    for (let i = 0; i < players.length; i++) {
        let player = players[i];

        if (player && ws.NEW_CLIENT.canSee(player)) {
            player.send(Packets.SERVER_TO_CLIENT.GET_CHAT, ws.NEW_CLIENT.sid, msg);
        }
    }
}