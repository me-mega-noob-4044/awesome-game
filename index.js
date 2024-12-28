const express = require("express");
const { WebSocketServer } = require("ws");
const app = express();
const wss = new WebSocketServer({ noServer: true });
const path = require("path");

const server = app.listen(3030, () => {
    console.log("Listening on port 3030");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/index.html"));
});

server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});