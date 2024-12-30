import { players } from "../../index.js";
import Packets from "../constants/Packets.js";

export default function sendHit(ws, angle) {
    let player = ws.NEW_CLIENT;

    if (player.meleeReload > 0) return;
    // player.meleeReload = 300;

    player.dir = angle;
    player.attack(players);

    for (let i = 0; i < players.length; i++) {
        let other = players[i];

        if (other && player.canSee(other)) {
            other.send(Packets.SERVER_TO_CLIENT.HIT_ANIMATION, player.sid, Math.round(Math.random()));
        }
    }
}