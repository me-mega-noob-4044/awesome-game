import Socket from "./Socket.js";

export default class Client {
    static socket;

    static connect() {
        this.socket = new Socket("ws://localhost:7070");
    }
}