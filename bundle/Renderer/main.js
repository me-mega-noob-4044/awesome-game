import { gameCanvas, mainContext, player } from "../main.js";
import colorConfig from "./constants/colorConfig.js";
import config from "../../backend/constants/config.js";
import renderPlayers from "./Renders/renderPlayers.js";
import UTILS from "../../backend/constants/utils.js";

var delta = 0;
var lastUpdate = 0;

export default class Renderer {
    static camX = 0;
    static camY = 0;

    static resize() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        gameCanvas.width = screenWidth;
        gameCanvas.height = screenHeight;
        gameCanvas.style.width = `${screenWidth}px`;
        gameCanvas.style.height = `${screenHeight}px`;

        let scaleFillNative = Math.max(
            screenWidth / config.maxScreenWidth,
            screenHeight / config.maxScreenHeight
        );

        mainContext.setTransform(
            scaleFillNative,
            0,
            0,
            scaleFillNative,
            (screenWidth - (config.maxScreenWidth * scaleFillNative)) / 2,
            (screenHeight - (config.maxScreenHeight * scaleFillNative)) / 2
        );
    }

    static update() {
        delta = Date.now() - lastUpdate;
        lastUpdate = Date.now();

        mainContext.fillStyle = colorConfig.grass;
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);

        if (player) {
            let tmpDist = UTILS.getDistance({
                x: this.camX,
                y: this.camY
            }, {
                y: player.x,
                y: player.y
            });
            let tmpDir = UTILS.getDirection({
                y: player.x,
                y: player.y
            }, {
                x: this.camX,
                y: this.camY
            });
            let camSpd = Math.min(tmpDist * 0.01 * delta, tmpDist);

            if (tmpDist > 0.05) {
                this.camX += camSpd * Math.cos(tmpDir);
                this.camY += camSpd * Math.sin(tmpDir);
            } else {
                this.camX = player.x;
                this.camY = player.y;
            }
        } else {
            this.camX = config.mapScale / 2;
            this.camY = config.mapScale / 2;
        }

        let xOffset = this.camX - config.maxScreenWidth / 2;
        let yOffset = this.camY - config.maxScreenHeight / 2;

        renderPlayers(mainContext, xOffset, yOffset);

        mainContext.globalAlpha = 1;
        mainContext.fillStyle = "rgba(0, 0, 70, 0.35)";
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);

        window.requestAnimationFrame(() => {
            Renderer.update();
        });
    }
}

window.requestAnimationFrame(() => {
    Renderer.update();
});