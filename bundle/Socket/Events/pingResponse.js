import { pingDisplay } from "../../main.js";
import Client from "../Client.js";

export default function pingResponse() {
    Client.pingTime = Date.now() - Client.lastPingDate;
    pingDisplay.innerText = `${Client.pingTime} ms`;
}