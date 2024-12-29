import { gameObjects } from "../../main.js";
import colorConfig from "../constants/colorConfig.js";
import renderCircle from "../utils/renderCircle.js";
import config from "../../../backend/constants/config.js";

export default function renderGameObject(mainContext, xOffset, yOffset, delta, layer) {
    mainContext.globalAlpha = 1;

    for (let i = 0; i < gameObjects.length; i++) {
        let tmpObj = gameObjects[i];

        if (tmpObj && tmpObj.active) {
            mainContext.save();
            mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);

            if (tmpObj.name == "pond") {
                if (layer == 0) {
                    mainContext.fillStyle = colorConfig.sandColor;
                    renderCircle(0, 0, mainContext, tmpObj.scale + 50, false, true);
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

                    if (tmpObj.y + tmpObj.scale <= config.snowBiomeEndY) {
                        if (layer == 1) {
                            mainContext.fillStyle = colorConfig.iceColor;
                            renderCircle(0, 0, mainContext, tmpObj.scale * tmpObj.waterMult, false, true);
                        }
                    } else {
                        mainContext.fillStyle = colorConfig.waterColor;
                        renderCircle(0, 0, mainContext, tmpObj.scale * tmpObj.waterMult, false, true);
                    }
                }
            }

            mainContext.restore();
        }
    }
}