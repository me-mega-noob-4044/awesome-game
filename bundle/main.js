import Loader from "./Socket/Loader.js";
import Renderer from "./Renderer/main.js";

export var gameCanvas = document.getElementById("game-canvas");
export var mainContext = gameCanvas.getContext("2d"); // Might use webgl in future
export var mainMenu = document.getElementById("main-menu");
export var menuInputs = document.getElementById("menu-inputs");
export var loadingText = document.getElementById("loading-text");
export var nameInput = document.getElementById("name-input");
export var joinGame = document.getElementById("join-game");
export var gameUI = document.getElementById("game-ui");

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