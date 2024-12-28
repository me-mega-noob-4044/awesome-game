import UTILS from "../../backend/constants/utils.js";
import PacketManager from "./PacketManager.js";

export default class Socket extends WebSocket {
    constructor(url, protocols) {
        super(url, protocols);

        super.binaryType = "arraybuffer";

        this.onopen = () => this.onOpen();
        this.onmessage = (msg) => this.onMessage(msg);
        this.onclose = ({ reason, code }) => this.onclose(reason, code);
    }

    onOpen() {
        console.log("Socket connected");
    }

    onMessage(msg) {
        let [type, data] = UTILS.decodeMessage(msg.data);
    }

    onClose(reason, code) {
        // handle close events lalalal
    }
}