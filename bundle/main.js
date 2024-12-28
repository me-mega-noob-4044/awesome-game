import Loader from "./Socket/Loader.js";
import Renderer from "./Renderer/main.js";

export var gameCanvas = document.getElementById("game-canvas");
export var mainContext = gameCanvas.getContext("2d"); // Might use webgl in future
export var mainMenu = document.getElementById("main-menu");
export var menuInputs = document.getElementById("menu-inputs");
export var loadingText = document.getElementById("loading-text");
export var nameInput = document.getElementById("name-input");
export var joinGame = document.getElementById("join-game");

window.onload = () => {
    Loader.init();
};

window.addEventListener("resize", Renderer.resize);
Renderer.resize();

window.oncontextmenu = (event) => event.preventDefault(); // Disable context menu :)