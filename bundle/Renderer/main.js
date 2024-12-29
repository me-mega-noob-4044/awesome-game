import { gameCanvas, mainContext, player, players } from "../main.js";
import colorConfig from "./constants/colorConfig.js";
import config from "../../backend/constants/config.js";
import renderPlayers from "./Renders/renderPlayers.js";
import UTILS from "../../backend/constants/utils.js";
import renderGrid from "./Renders/renderGrid.js";
import renderMapBorders from "./Renders/renderMapBorders.js";
import renderGround from "./Renders/renderGround.js";
import renderNames from "./Renders/renderNames.js";
import renderGameObject from "./Renders/renderGameObject.js";

var delta = 0;
var lastUpdate = 0;

Math.lerpAngle = (value1, value2, amount) => {
    let difference = Math.abs(value2 - value1);
    if (difference > Math.PI) {
        if (value1 > value2) {
            value2 += Math.PI * 2;
        } else {
            value1 += Math.PI * 2;
        }
    }

    let value = (value2 + ((value1 - value2) * amount));
    if (value >= 0 && value <= Math.PI * 2) return value;

    return (value % (Math.PI * 2));
}

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

        let lastTime = lastUpdate - config.serverUpdateSpeed;

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

        for (let i = 0; i < players.length; i++) {
            let tmpObj = players[i];

            if (tmpObj && tmpObj.visible) {
                if (tmpObj.forcePos) {
                    tmpObj.x = tmpObj.x2;
                    tmpObj.y = tmpObj.y2;
                    tmpObj.dir = tmpObj.d2;
                } else {
                    let total = tmpObj.t2 - tmpObj.t1;
                    let fraction = lastTime - tmpObj.t1;
                    let ratio = (fraction / total);
                    let rate = 170;

                    tmpObj.dt += delta;

                    let tmpRate = Math.min(1.7, tmpObj.dt / rate);
                    let tmpDiff = (tmpObj.x2 - tmpObj.x1);

                    tmpObj.x = tmpObj.x1 + (tmpDiff * tmpRate);
                    tmpDiff = (tmpObj.y2 - tmpObj.y1);
                    tmpObj.y = tmpObj.y1 + (tmpDiff * tmpRate);

                    tmpObj.dir = Math.lerpAngle(tmpObj.d2, tmpObj.d1, Math.min(1.2, ratio));
                }
            }
        }

        let xOffset = this.camX - config.maxScreenWidth / 2;
        let yOffset = this.camY - config.maxScreenHeight / 2;

        renderGround(mainContext, xOffset, yOffset);
        renderGameObject(mainContext, xOffset, yOffset, delta, 0);
        renderGameObject(mainContext, xOffset, yOffset, delta, 1);
        renderGameObject(mainContext, xOffset, yOffset, delta, 2);
        renderGrid(mainContext);
        renderPlayers(mainContext, xOffset, yOffset);
        renderMapBorders(mainContext, xOffset, yOffset);

        mainContext.globalAlpha = 1;
        mainContext.fillStyle = "rgba(0, 0, 70, 0.35)";
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);

        renderNames(mainContext, xOffset, yOffset);

        window.requestAnimationFrame(() => {
            Renderer.update();
        });
    }
}

window.requestAnimationFrame(() => {
    Renderer.update();
});