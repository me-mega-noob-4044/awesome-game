import Renderer from "../main.js";
import config from "../../../backend/constants/config.js";

export default function renderGrid(mainContext) {
    let x, y;

    mainContext.lineWidth = 4;
    mainContext.strokeStyle = "#000";
    mainContext.globalAlpha = 0.06;
    mainContext.beginPath();

    for (x = -Renderer.camX; x < config.maxScreenWidth; x += config.maxScreenHeight / 9) {
        if (x > 0) {
            mainContext.moveTo(x, 0);
            mainContext.lineTo(x, config.maxScreenHeight);
        }
    }

    for (y = -Renderer.camY; y < config.maxScreenHeight; y += config.maxScreenHeight / 9) {
        if (x > 0) {
            mainContext.moveTo(0, y);
            mainContext.lineTo(config.maxScreenWidth, y);
        }
    }

    mainContext.stroke();
}