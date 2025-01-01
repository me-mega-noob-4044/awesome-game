import { config } from "dotenv";
config();

import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const wss = new WebSocketServer({ noServer: true });

const server = app.listen(7070, "0.0.0.0", () => {
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

app.get("*", (req, res) => {
    res.redirect("/");
});

import UTILS from "./backend/constants/utils.js";
import gameConfig from "./backend/constants/config.js";
import Packets from "./backend/constants/Packets.js";
import ServerPacketManager from "./backend/logic/PacketManager.js";
import ObjectManager from "./backend/logic/ObjectManager.js";
import AiManager from "./backend/logic/AiManager.js";

export const players = [];
export const gameObjects = [];
export const ais = [];

function initGame() {
    try {
        // VOLCANO:
        ObjectManager.add(1, gameConfig.mapScale / 2, gameConfig.mapScale / 2, gameObjects.length, gameObjects);

        // LAVA POOLS
        ObjectManager.add(2, 5300, 6e3, gameObjects.length, gameObjects);
        ObjectManager.add(2, 6450, 5500, gameObjects.length, gameObjects);
        ObjectManager.add(2, 6200, 6500, gameObjects.length, gameObjects);

        // PONDS:

        // UPPER BODY OF LAND:
        for (let i = 0; i < 5; i++) {
            let x = UTILS.randInt(3455, 8545);
            let y = UTILS.randInt(0, 3145);

            while (gameObjects.some(e => UTILS.getDistance({ x, y }, e) <= e.scale + 550)) {
                x = UTILS.randInt(3455, 8545);
                y = UTILS.randInt(0, 3145);
            }

            ObjectManager.add(0, x, y, gameObjects.length, gameObjects);
        }

        // MIDDLE BODY OF LAND:
        for (let i = 0; i < 3; i++) {
            let x = UTILS.randInt(3455, 8545);
            let y = UTILS.randInt(4900, 7e3);

            while (gameObjects.some(e => UTILS.getDistance({ x, y }, e) <= e.scale + 550)) {
                x = UTILS.randInt(3455, 8545);
                y = UTILS.randInt(4900, 7e3);
            }

            ObjectManager.add(0, x, y, gameObjects.length, gameObjects);
        }

        // BOTTOM BODY OF LAND:
        for (let i = 0; i < 7; i++) {
            let x = UTILS.randInt(3455, 8545);
            let y = UTILS.randInt(9e3, gameConfig.mapScale);

            while (gameObjects.some(e => UTILS.getDistance({ x, y }, e) <= e.scale + 550)) {
                x = UTILS.randInt(3455, 8545);
                y = UTILS.randInt(9e3, gameConfig.mapScale);
            }

            ObjectManager.add(0, x, y, gameObjects.length, gameObjects);
        }

        // DRAGON
        AiManager.add(1, gameConfig.mapScale / 2, gameConfig.mapScale / 2);

        let landIds = [2, 4, 5];

        for (let i = 0; i < 45; i++) {
            AiManager.add(landIds[Math.floor(Math.random() * 3)], UTILS.randInt(3455, 8545), UTILS.randInt(0, gameConfig.mapScale));
        }
    } catch (error) {
        console.error("Error initializing game:", error);
    }
}

initGame();

wss.on("connection", (ws) => {
    try {
        ws.PACKET_COUNT = 0;

        if (players.length >= 20) {
            ws.close(4001, "There are no spots left in the server");
        }

        ws.on("message", (msg) => {
            try {
                let [type, data] = UTILS.decodeMessage(msg);

                if (!Object.values(Packets.CLIENT_TO_SERVER).includes(type)) {
                    ws.close(1003, "Invalid packet type");
                    return;
                }

                if (ws.PACKET_COUNT >= 50) {
                    ws.close(4001, "Packet limit reached");
                    return;
                }

                ws.PACKET_COUNT++;
                setTimeout(() => {
                    ws.PACKET_COUNT--;
                }, 1e3);

                try {
                    ServerPacketManager.handle(ws, type, data);
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.error("Error handling message:", error);
            }
        });

        ws.on("close", () => {
            try {
                if (!ws.NEW_CLIENT) return;

                let player = ws.NEW_CLIENT;

                for (let i = 0; i < players.length; i++) {
                    let other = players[i];

                    if (player.sentTo[other.id]) {
                        other.send(Packets.SERVER_TO_CLIENT.REMOVE_PLAYER, player.sid);
                    }
                }

                let indx = players.indexOf(player);
                players.splice(indx, 1);
            } catch (error) {
                console.error("Error handling close:", error);
            }
        });
    } catch (error) {
        console.error("Error on connection:", error);
    }
});

setInterval(() => {
    try {
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            let data = [];

            if (!player) continue;

            player.update(gameConfig.serverUpdateSpeed, players, gameObjects);

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

            let gameObjectsData = [];

            for (let t = 0; t < gameObjects.length; t++) {
                let tmpObj = gameObjects[t];

                if (tmpObj.active) {
                    if (!tmpObj.sentTo[player.id] && player.canSee(tmpObj)) {
                        tmpObj.sentTo[player.id] = 1;
                        gameObjectsData.push(tmpObj.sid, tmpObj.x, tmpObj.y, tmpObj.sid, tmpObj.id);
                    }
                }
            }

            if (gameObjectsData.length) {
                player.send(Packets.SERVER_TO_CLIENT.LOAD_GAME_OBJECT, gameObjectsData);
            }

            let aiData = [];

            for (let t = 0; t < ais.length; t++) {
                let ai = ais[t];

                if (ai && player.canSee(ai) && ai.isAlive) {
                    aiData.push(
                        ai.sid,
                        ai.id,
                        ai.x,
                        ai.y,
                        ai.dir,
                        ai.health
                    );
                }
            }

            player.send(Packets.SERVER_TO_CLIENT.LOAD_AI, aiData);
            player.send(Packets.SERVER_TO_CLIENT.UPDATE_PLAYERS, data);
        }

        for (let i = 0; i < ais.length; i++) {
            let ai = ais[i];

            if (ai) ai.update(gameConfig.serverUpdateSpeed, players, gameObjects);
        }
    } catch (error) {
        console.error("Game loop error:", error);
    }
}, gameConfig.serverUpdateSpeed);

export function getLeaderboardData() {
    try {
        let sorted = players.filter(e => e.isAlive).sort((a, b) => b.totalXP - a.totalXP);
        let data = [];

        for (let i = 0; i < 10; i++) {
            let player = sorted[i];

            if (player) {
                data.push(
                    player.name,
                    player.sid,
                    player.totalXP
                );
            }
        }

        return data;
    } catch (error) {
        console.error("Error getting leaderboard data:", error);
        return [];
    }
}

setInterval(() => {
    try {
        let data = getLeaderboardData();

        for (let i = 0; i < players.length; i++) {
            let player = players[i];

            player.send(Packets.SERVER_TO_CLIENT.UPDATE_LEADERBOARD, data);
        }
    } catch (error) {
        console.error("Error updating leaderboard:", error);
    }
}, 3e3);

server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});