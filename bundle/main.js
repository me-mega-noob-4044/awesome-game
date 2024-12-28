import Loader from "./Socket/Loader.js";
import Renderer from "./Renderer/main.js";

export var gameCanvas = document.getElementById("game-canvas");
export var mainContext = gameCanvas.getContext("2d"); // Might use webgl in future
export var mainMenu = document.getElementById("main-menu");

window.onload = () => {
    Loader.init();
};

window.addEventListener("resize", Renderer.resize);
Renderer.resize();