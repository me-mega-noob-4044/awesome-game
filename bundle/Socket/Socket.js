import UTILS from "../../backend/constants/utils.js";
import PacketManager from "./PacketManager.js";
import { menuInputs, loadingText, mainMenu, gameUI, player } from "../main.js";
import Client from "./Client.js";
import Packets from "../../backend/constants/Packets.js";

export default class Socket extends WebSocket {
    constructor(url, protocols) {
        super(url, protocols);

        super.binaryType = "arraybuffer";

        this.onopen = () => this.onOpen();
        this.onmessage = (msg) => this.onMessage(msg);
        this.onclose = ({ reason }) => this.onClose(reason);
    }

    onOpen() {
        console.log("Socket connected");

        menuInputs.style.display = "flex";
        loadingText.style.display = "none";

        setInterval(() => {
            this.send(Packets.CLIENT_TO_SERVER.PING);
            Client.lastPingDate = Date.now();
        }, 3e3);
    }

    onMessage(msg) {
        let [type, data] = UTILS.decodeMessage(msg.data);

        PacketManager.handle(type, data);
    }

    send(type, ...args) {
        super.send(UTILS.encodeMessage(type, ...args));
    }

    onClose(reason) {
        gameUI.style.display = "none";
        mainMenu.style.display = "flex";
        menuInputs.style.display = "none";
        loadingText.style.display = "block";
        loadingText.innerText = reason || "disconnected";
    }
}