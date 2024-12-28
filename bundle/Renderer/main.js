import { gameCanvas, mainContext } from "../main.js";

export default class Renderer {
    static resize() {
        gameCanvas.width = window.innerWidth;
        gameCanvas.height = window.innerHeight;
    }
}