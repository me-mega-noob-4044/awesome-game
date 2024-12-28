import Client from "./Client.js";
import PacketManager from "./PacketManager.js";
import { joinGame } from "../main.js";

export default class Loader {
    static init() {
        this.hookEvents();
        Client.connect();
    }

    static hookEvents() {
        joinGame.onclick = (event) => {
            if (!event.isTrusted) return;
            PacketManager.sendJoin();
        };
    }
}