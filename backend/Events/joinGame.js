import { players, getLeaderboardData } from "../../index.js";
import Player from "../logic/Player.js";
import Packets from "../constants/Packets.js";

export default function joinGame(ws, ...args) {
    let player = ws.NEW_CLIENT;

    if (!ws.NEW_CLIENT) {
        player = new Player(ws);

        ws.NEW_CLIENT = player;
        players.push(player);
    } else if (player && player.isAlive) {
        return;
    }

    player.setName(args[0]);
    player.spawn();

    // player.send(Packets.SERVER_TO_CLIENT.UPDATE_ITEMS, []);
    player.send(Packets.SERVER_TO_CLIENT.UPDATE_AGE, 1);
    player.send(Packets.SERVER_TO_CLIENT.UPDATE_XP, 0, player.maxXP);
    player.send(Packets.SERVER_TO_CLIENT.UPDATE_UPGRADES, 2, 0);
    player.send(Packets.SERVER_TO_CLIENT.UPDATE_LEADERBOARD, getLeaderboardData());
    player.send(Packets.SERVER_TO_CLIENT.SET_UP_GAME, player.sid);
    player.send(Packets.SERVER_TO_CLIENT.UPDATE_HEALTH, player.health, player.maxHealth);
    player.send(Packets.SERVER_TO_CLIENT.ADD_PLAYER, player.getData(), true);
}