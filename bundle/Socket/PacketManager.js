import Packets from "../../backend/constants/Packets.js";
import Client from "./Client.js";
import { nameInput } from "../main.js";
import setUpGame from "./Events/setUpGame.js";
import addPlayer from "./Events/addPlayer.js";

export default class PacketManager {
    static eventMap = new Map([
        [Packets.SERVER_TO_CLIENT.SET_UP_GAME, setUpGame],
        [Packets.SERVER_TO_CLIENT.ADD_PLAYER, addPlayer]
    ]);

    static handle(type, data) {
        let eventHandler = this.eventMap.get(type);

        if (eventHandler) {
            eventHandler(...data);
        }
    }

    static sendJoin() {
        Client.send(Packets.CLIENT_TO_SERVER.JOIN_GAME, nameInput.value);
    }
}