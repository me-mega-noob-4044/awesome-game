import Loader from "./Socket/Loader.js";
import Renderer from "./Renderer/main.js";
import PacketManager from "./Socket/PacketManager.js";

export var gameCanvas = document.getElementById("game-canvas");
export var mainContext = gameCanvas.getContext("2d"); // Might use webgl in future
export var mainMenu = document.getElementById("main-menu");
export var menuInputs = document.getElementById("menu-inputs");
export var loadingText = document.getElementById("loading-text");
export var nameInput = document.getElementById("name-input");
export var joinGame = document.getElementById("join-game");
export var gameUI = document.getElementById("game-ui");
export var healthBar = document.getElementById("health-bar");
export var healthDisplay = document.getElementById("health-display");
export var healthText = document.getElementById("heath-text");

export const players = [];
export var player;

export var mouseX = 0;
export var mouseY = 0;

export function setPlayer(newPlayer) {
    player = newPlayer;
}

window.onload = () => {
    Loader.init();
};

window.addEventListener("resize", Renderer.resize);
Renderer.resize();

window.oncontextmenu = (event) => event.preventDefault(); // Disable context menu :)

window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

var keys = {};
var moveKeys = {
    87: [0, -1],
    38: [0, -1],
    83: [0, 1],
    40: [0, 1],
    65: [-1, 0],
    37: [-1, 0],
    68: [1, 0],
    39: [1, 0]
};

function getMoveDir() {
    let dx = 0;
    let dy = 0;
    
    for (let key in moveKeys) {
        let tmpDir = moveKeys[key];

        dx += !!keys[key] * tmpDir[0];
        dy += !!keys[key] * tmpDir[1];
    }

    return (dx == 0 && dy == 0) ? undefined : Math.atan2(dy, dx);
}

window.addEventListener("keydown", (event) => {
    if (!event.isTrusted) return;

    keys[event.keyCode] = 1;

    if (moveKeys[event.keyCode]) {
        PacketManager.sendMove(getMoveDir());
    }
});

window.addEventListener("keyup", (event) => {
    if (!event.isTrusted) return;

    keys[event.keyCode] = 0;

    if (moveKeys[event.keyCode]) {
        PacketManager.sendMove(getMoveDir());
    }
});

Object.freeze(WebSocket.prototype); // Freeze WebSocket.prototype :)