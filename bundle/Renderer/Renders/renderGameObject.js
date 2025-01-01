import { gameObjects } from "../../main.js";
import colorConfig from "../constants/colorConfig.js";
import renderCircle from "../utils/renderCircle.js";
import config from "../../../backend/constants/config.js";
import renderStar from "../utils/renderStar.js";

export default function renderGameObject(mainContext, xOffset, yOffset, delta, layer) {
    mainContext.globalAlpha = 1;

    for (let i = 0; i < gameObjects.length; i++) {
        let tmpObj = gameObjects[i];

        if (tmpObj && tmpObj.active && (typeof tmpObj.layer == "object" ? tmpObj.layer.includes(layer) : layer == tmpObj.layer)) {
            mainContext.save();
            mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);

            if (tmpObj.name == "land" || tmpObj.name == "pond" || tmpObj.name == "lava pond") {
                if (tmpObj.name == "land" || layer == 0 || (tmpObj.name == "lava pond" && layer == 4)) {
                    if (tmpObj.name == "land") {
                        mainContext.fillStyle = colorConfig.sandColor;
                        renderCircle(0, 0, mainContext, tmpObj.scale, false, true);
                    } else {
                        mainContext.fillStyle = tmpObj.y >= config.mapScale - 2e3 ? colorConfig.darkSandColor : colorConfig.sandColor;
                        renderCircle(0, 0, mainContext, tmpObj.scale + 50, false, true);
                    }
                } else {
                    if (tmpObj.y + tmpObj.scale > config.snowBiomeEndY) {
                        tmpObj.waterMult += tmpObj.waterPlus * config.waveSpeed * delta;
                        if (tmpObj.waterMult >= config.waveMax) {
                            tmpObj.waterMult = config.waveMax;
                            tmpObj.waterPlus = -1;
                        } else if (tmpObj.waterMult <= 1) {
                            tmpObj.waterMult = tmpObj.waterPlus = 1;
                        }
                    }

                    if (tmpObj.name == "pond" && tmpObj.y + tmpObj.scale <= config.snowBiomeEndY) {
                        if (layer == 1) {
                            mainContext.fillStyle = colorConfig.iceColor;
                            renderCircle(0, 0, mainContext, tmpObj.scale * tmpObj.waterMult, false, true);
                        }
                    } else {
                        if (tmpObj.name == "pond" && tmpObj.y >= config.mapScale - 2e3) {
                            mainContext.fillStyle = colorConfig.darkestSandColor;
                            renderCircle(0, 0, mainContext, tmpObj.scale, false, true);
                        } else {
                            mainContext.fillStyle = tmpObj.name == "lava pond" ? colorConfig.lavaColor : colorConfig.waterColor;
                            renderCircle(0, 0, mainContext, tmpObj.scale * tmpObj.waterMult, false, true);
                        }
                    }
                }
            } else if (tmpObj.name == "volcano") {
                mainContext.fillStyle = colorConfig.sandColor;
                renderCircle(0, 0, mainContext, tmpObj.scale + 100, false, true);

                mainContext.fillStyle = colorConfig.darkSandColor;
                renderCircle(0, 0, mainContext, tmpObj.scale + 50, false, true);

                mainContext.fillStyle = colorConfig.darkestSandColor;
                renderCircle(0, 0, mainContext, 300, false, true);

                mainContext.strokeStyle = colorConfig.outlineColor;
                mainContext.fillStyle = colorConfig.volcanoBody;
                renderStar(mainContext, 5, 200, 200);
                mainContext.fill();
                mainContext.stroke();

                tmpObj.waterMult += tmpObj.waterPlus * config.waveSpeed * delta;
                if (tmpObj.waterMult >= config.waveMax) {
                    tmpObj.waterMult = config.waveMax;
                    tmpObj.waterPlus = -1;
                } else if (tmpObj.waterMult <= 1) {
                    tmpObj.waterMult = tmpObj.waterPlus = 1;
                }

                mainContext.fillStyle = colorConfig.lavaColor;
                renderCircle(0, 0, mainContext, 150 * tmpObj.waterMult, false, true);
            }

            mainContext.restore();
        }
    }
}