import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const wss = new WebSocketServer({ noServer: true });

const server = app.listen(7070, () => {
    console.log("Listening on port 7070");
});

app.get("/bundle.js", (req, res) => {
    res.sendFile(path.join(__dirname, "/dist/bundle.js"));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/style.css"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/index.html"));
});

import UTILS from "./backend/constants/utils.js";
import Packets from "./backend/constants/Packets.js";

wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        let [type, data] = UTILS.decodeMessage(msg);

        console.log(type, data);
    });

    ws.on("close", (msg) => {
    });
});

server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});