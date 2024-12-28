import Packets from "../../backend/constants/Packets.js";
import Client from "./Client.js";
import { nameInput } from "../main.js";

export default class PacketManager {
    static sendJoin() {
        Client.send(Packets.CLIENT_TO_SERVER.JOIN_GAME, nameInput.value);
    }
}