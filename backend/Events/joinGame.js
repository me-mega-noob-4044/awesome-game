import { players } from "../../index.js";
import Player from "../logic/Player.js";
import Packets from "../constants/Packets.js";

export default function joinGame(ws, ...args) {
    let player = ws.NEW_CLIENT;

    if (!ws.NEW_CLIENT) {
        player = new Player(ws);

        ws.NEW_CLIENT = player;
        players.push(player);
    }

    player.setName(args[0]);
    player.spawn();

    player.send(Packets.SERVER_TO_CLIENT.SET_UP_GAME, player.sid);
    player.send(Packets.SERVER_TO_CLIENT.ADD_PLAYER, player.getData(), true);
}