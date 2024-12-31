import { gameCanvas, mainContext, player, players, particles, ais } from "../main.js";
import config from "../../backend/constants/config.js";
import renderPlayers from "./Renders/renderPlayers.js";
import UTILS from "../../backend/constants/utils.js";
import renderGrid from "./Renders/renderGrid.js";
import renderMapBorders from "./Renders/renderMapBorders.js";
import renderGround from "./Renders/renderGround.js";
import renderNames from "./Renders/renderNames.js";
import renderGameObject from "./Renders/renderGameObject.js";
import renderParticleEffects from "./Renders/renderParticleEffects.js";
import renderAnimText from "./Renders/renderAnimText.js";
import PacketManager from "../Socket/PacketManager.js";
import Client from "../Socket/Client.js";
import Particles from "./constants/Particles.js";
import renderChats from "./Renders/renderChats.js";
import renderMinimap from "./Renders/renderMinimap.js";
import renderAi from "./Renders/renderAi..js";

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

    static lastSendAim = 0;
    static timeOut = 1e3;

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

    static lavaParticles(delta) {
        this.timeOut -= delta;
        if (this.timeOut <= 0) {
            particles.push(new Particles(
                -1,
                UTILS.randInt(config.mapScale / 2 - 85, config.mapScale / 2 + 85),
                UTILS.randInt(config.mapScale / 2 - 85, config.mapScale / 2 + 85),
                "lava"
            ));

            for (let i = 0; i < 3; i++) if (Math.random() > .5) particles.push(new Particles(
                -1,
                UTILS.randInt(config.mapScale / 2 - 85, config.mapScale / 2 + 85),
                UTILS.randInt(config.mapScale / 2 - 85, config.mapScale / 2 + 85),
                "lava"
            ));

            this.timeOut = UTILS.randInt(250, 750);
        }
    }

    static update() {
        let now = Date.now();
        delta = now - lastUpdate;
        lastUpdate = now;

        let lastTime = now - config.serverUpdateSpeed;

        if (!this.lastSendAim || now - this.lastSendAim >= (1e3 / 10)) {
            this.lastSendAim = Date.now();

            if (player) {
                PacketManager.sendAim(Client.getDir());
            }
        }

        if (player) {
            let tmpDist = UTILS.getDistance({
                x: this.camX,
                y: this.camY
            }, {
                x: player.x,
                y: player.y
            });
            let tmpDir = UTILS.getDirection({
                x: player.x,
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

        for (let i = 0; i < players.length + ais.length; i++) {
            let tmpObj = players[i] || ais[i - players.length];

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
        renderParticleEffects(mainContext, xOffset, yOffset, delta, "pond");
        renderGrid(mainContext);
        renderGameObject(mainContext, xOffset, yOffset, delta, 3);
        renderGameObject(mainContext, xOffset, yOffset, delta, 4);
        renderGameObject(mainContext, xOffset, yOffset, delta, 5);
        renderParticleEffects(mainContext, xOffset, yOffset, delta, "lava");
        renderPlayers(mainContext, xOffset, yOffset, delta);
        renderAi(mainContext, xOffset, yOffset);
        renderMapBorders(mainContext, xOffset, yOffset);

        mainContext.globalAlpha = 1;
        mainContext.fillStyle = "rgba(0, 0, 70, 0.35)";
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);

        renderAnimText(mainContext, xOffset, yOffset, delta);
        if (player) this.lavaParticles(delta);

        if (player) document.title = `${player.x.toFixed(0)} | ${player.y.toFixed(0)}`;

        renderNames(mainContext, xOffset, yOffset);
        renderChats(mainContext, xOffset, yOffset, delta);

        renderMinimap();

        window.requestAnimationFrame(() => {
            Renderer.update();
        });
    }
}

window.requestAnimationFrame(() => {
    Renderer.update();
});