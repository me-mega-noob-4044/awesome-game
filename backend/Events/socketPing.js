import Packets from "../constants/Packets.js";

export default function socketPing(ws) {
    ws.NEW_CLIENT.send(Packets.SERVER_TO_CLIENT.PING_RESPONSE);
}