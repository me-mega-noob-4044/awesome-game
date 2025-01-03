import Packets from "../constants/Packets.js";
import skills from "../constants/skills.js";
import Dash from "./Skills/Dash.js";
import Kamikaze from "./Skills/Kamikaze.js";
import Stealth from "./Skills/stealth.js";
import { players } from "../../index.js";

export default function getAttack(ws, id) {
    let player = ws.NEW_CLIENT;
    if (!player) return;

    if (player.items[id] == undefined) return ws.close(4001, "Invalid item");

    let itemId = player.items[id];
    let item = skills[itemId];

    if (!item) return ws.close(4001, "Invalid item");

    if (player.itemReload[itemId]) return;

    player.itemReload[itemId] = item.speed;

    let duration = 0;
    let key;

    if (item.name == "Stealth") {
        key = "stealthTimer";
        duration = Stealth(player);
    } else if (item.name == "Dash") {
        duration = Dash(player);
    } else if (item.name == "Kamikaze") {
        key = "kamikazeTimer";
        duration = Kamikaze(player);
    }

    if (key) {
        for (let i = 0; i < players.length; i++) {
            let other = players[i];
    
            if (other.canSee(player)) {
                other.send(Packets.SERVER_TO_CLIENT.UPDATE_EFFECTS, player.sid, key, duration);
            }
        }
    }

    player.send(Packets.SERVER_TO_CLIENT.UPDATE_RELOAD, id, duration + item.speed);
}