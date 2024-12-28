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
import config from "./backend/constants/config.js";
import Packets from "./backend/constants/Packets.js";
import ServerPacketManager from "./backend/logic/PacketManager.js";

export const players = [];

wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        let [type, data] = UTILS.decodeMessage(msg);

        if (!Object.values(Packets.CLIENT_TO_SERVER).includes(type)) {
            ws.close(1003, "Invalid packet type");
            return;
        }

        try {
            ServerPacketManager.handle(ws, type, data);
        } catch (error) {
            console.log(error);
        }
    });

    ws.on("close", (msg) => {
    });
});

setInterval(() => {
    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        let data = [];

        if (!player) continue;

        player.update(config.serverUpdateSpeed);

        for (let t = 0; t < players.length; t++) {
            let other = players[t];

            if (other.canSee(player) && other.isAlive) {
                if (!player.sentTo[other.id] && player.id != other.id) {
                    player.sentTo[other.id] = 1;
                    player.send(Packets.SERVER_TO_CLIENT.ADD_PLAYER, other.getData());
                }

                data.push(
                    other.sid,
                    other.x,
                    other.y,
                    other.dir
                );
            }
        }

        player.send(Packets.SERVER_TO_CLIENT.UPDATE_PLAYERS, data);
    }
}, config.serverUpdateSpeed);

server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});