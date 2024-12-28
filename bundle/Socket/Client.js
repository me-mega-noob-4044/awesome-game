import Socket from "./Socket.js";

export default class Client {
    static socket;
    static playerSID;

    static send(type, ...args) { // Ah yes 3rd send method
        this.socket.send(type, ...args);
    }

    static connect() {
        this.socket = new Socket("ws://localhost:7070");
    }
}