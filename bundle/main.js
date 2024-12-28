import Loader from "./Socket/Loader.js";

export var gameCanvas = document.getElementById("game-canvas");
export var mainMenu = document.getElementById("main-menu");

window.onload = () => {
    Loader.init();
};