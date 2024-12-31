import Socket from "./Socket.js";
import { mouseX, mouseY } from "../main.js";

export default class Client {
    static socket;
    static playerSID;

    static send(type, ...args) { // Ah yes 3rd send method
        this.socket.send(type, ...args);
    }

    static getDir() {
        return Math.atan2(mouseY - (window.innerHeight / 2), mouseX - (window.innerWidth / 2));
    }

    static connect() {
        if (location.href.includes("localhost")) {
            this.socket = new Socket("ws://localhost:7070");
        } else {
            this.socket = new Socket(`wss://${location.href.split("://")[1]}`);
        }
    }
}