import Packets from "../constants/Packets.js";
import skills from "../constants/skills.js";
import Stealth from "./Skills/stealth.js";

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

    if (item.name == "Stealth") {
        duration = Stealth(player);
    } else if (item.name == "Dash") {
        duration = Dash(player);
    }

    player.send(Packets.SERVER_TO_CLIENT.UPDATE_RELOAD, id, duration + item.speed);
}