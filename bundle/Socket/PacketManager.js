import Packets from "../../backend/constants/Packets.js";
import Client from "./Client.js";
import { nameInput, player } from "../main.js";
import setUpGame from "./Events/setUpGame.js";
import addPlayer from "./Events/addPlayer.js";
import updatePlayers from "./Events/updatePlayers.js";
import updateHealth from "./Events/updateHealth.js";
import removePlayer from "./Events/removePlayer.js";
import loadGameObjects from "./Events/loadGameObjects.js";
import showText from "./Events/showText.js";
import killPlayer from "./Events/killPlayer.js";
import hitAnimation from "./Events/hitAnimation.js";

export default class PacketManager {
    static eventMap = new Map([
        [Packets.SERVER_TO_CLIENT.SET_UP_GAME, setUpGame],
        [Packets.SERVER_TO_CLIENT.ADD_PLAYER, addPlayer],
        [Packets.SERVER_TO_CLIENT.UPDATE_PLAYERS, updatePlayers],
        [Packets.SERVER_TO_CLIENT.UPDATE_HEALTH, updateHealth],
        [Packets.SERVER_TO_CLIENT.REMOVE_PLAYER, removePlayer],
        [Packets.SERVER_TO_CLIENT.LOAD_GAME_OBJECT, loadGameObjects],
        [Packets.SERVER_TO_CLIENT.SHOW_TEXT, showText],
        [Packets.SERVER_TO_CLIENT.KILL_PLAYER, killPlayer],
        [Packets.SERVER_TO_CLIENT.HIT_ANIMATION, hitAnimation]
    ]);

    static handle(type, data) {
        let eventHandler = this.eventMap.get(type);

        if (eventHandler) {
            eventHandler(...data);
        }
    }

    static sendAim() {
        Client.send(Packets.CLIENT_TO_SERVER.SEND_AIM, Client.getDir());
    }

    static sendHit() {
        Client.send(Packets.CLIENT_TO_SERVER.SEND_HIT, Client.getDir());
    }

    static sendJoin() {
        Client.send(Packets.CLIENT_TO_SERVER.JOIN_GAME, nameInput.value);
    }

    static sendMove(angle) {
        if (!player) return;
        Client.send(Packets.CLIENT_TO_SERVER.MOVE, angle);
    }
}