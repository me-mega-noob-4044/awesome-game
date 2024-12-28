import Packets from "../../backend/constants/Packets.js";
import Client from "./Client.js";

export default class PacketManager {
    static sendJoin(name) {
        Client.send(Packets.CLIENT_TO_SERVER.JOIN_GAME, name);
    }
}