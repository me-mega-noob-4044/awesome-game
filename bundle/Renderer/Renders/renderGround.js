import config from "../../../backend/constants/config.js";
import colorConfig from "../constants/colorConfig.js";

var waterMult = 1;
var waterPlus = 0;

export default function renderGround(mainContext, xOffset, yOffset, delta) {
    waterMult += waterPlus * config.waveSpeed * delta;
    if (waterMult >= config.waveMax) {
        waterMult = config.waveMax;
        waterPlus = -1;
    } else if (waterMult <= 1) {
        waterMult = waterPlus = 1;
    }

    if (config.snowBiomeEndY - yOffset >= 0) {
        mainContext.fillStyle = colorConfig.snow;
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.snowBiomeEndY - yOffset);

        mainContext.fillStyle = colorConfig.grass;
        mainContext.fillRect(
            0,
            config.snowBiomeEndY - yOffset,
            config.maxScreenWidth,
            config.maxScreenHeight - (config.snowBiomeEndY - yOffset)
        );
    } else if (config.snowBiomeEndY - yOffset >= config.maxScreenHeight) {
        mainContext.fillStyle = colorConfig.snow;
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);
    } else {
        mainContext.fillStyle = colorConfig.grass;
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);
    }

    // DESSERT:
    if (config.mapScale - 2e3 - yOffset <= 0) {
        mainContext.fillStyle = colorConfig.sandColor;
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);
    } else {
        mainContext.fillStyle = colorConfig.sandColor;
        mainContext.fillRect(-xOffset, config.mapScale - yOffset - 2e3, config.mapScale, 2e3);
    }

    // FIRST RIVER SAND:
    mainContext.fillStyle = colorConfig.sandColor;
    mainContext.fillRect(-xOffset, 3575 - yOffset, config.mapScale, 850);

    // SECOND RIVER SAND:
    mainContext.fillStyle = colorConfig.sandColor;
    mainContext.fillRect(-xOffset, 7575 - yOffset, config.mapScale, 850);

    // OCEAN ONE SAND:
    if (3050 - xOffset >= config.maxScreenWidth) {
        mainContext.fillStyle = colorConfig.sandColor;
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);
    } else if (3050 - xOffset >= 0) {
        mainContext.fillStyle = colorConfig.sandColor;
        mainContext.fillRect(0, 0, 3050 - xOffset, config.maxScreenHeight);
    }

    // OCEAN TWO SAND:
    if (config.mapScale - 3050 - xOffset <= 0) {
        mainContext.fillStyle = colorConfig.sandColor;
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);
    } else if (config.mapScale - 3050 - xOffset <= config.maxScreenWidth) {
        mainContext.fillStyle = colorConfig.sandColor;
        mainContext.fillRect(config.mapScale - 3050 - xOffset, 0, 3050, config.maxScreenHeight);
    }

    // FIRST RIVER:
    mainContext.fillStyle = colorConfig.waterColor;
    mainContext.fillRect(-xOffset, 4e3 - ((750 * waterMult) / 2) - yOffset, config.mapScale, 750 * waterMult);

    // SECOND RIVER:
    mainContext.fillStyle = colorConfig.waterColor;
    mainContext.fillRect(-xOffset, 8e3 - ((750 * waterMult) / 2) - yOffset, config.mapScale, 750 * waterMult);

    // OCEAN ONE:
    if (3e3 - xOffset >= config.maxScreenWidth) {
        mainContext.fillStyle = colorConfig.waterColor;
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);
    } else if ((3e3 + (300 * (waterMult - 1))) - xOffset >= 0) {
        mainContext.fillStyle = colorConfig.waterColor;
        mainContext.fillRect(0, 0, (3e3 + (300 * (waterMult - 1))) - xOffset, config.maxScreenHeight);
    }

    // OCEAN TWO:
    if (config.mapScale - 3e3 - xOffset <= 0) {
        mainContext.fillStyle = colorConfig.waterColor;
        mainContext.fillRect(0, 0, config.maxScreenWidth, config.maxScreenHeight);
    } else if (config.mapScale - (3e3 + (300 * (waterMult - 1))) - xOffset <= config.maxScreenWidth) {
        mainContext.fillStyle = colorConfig.waterColor;
        mainContext.fillRect(config.mapScale - (3e3 + (300 * (waterMult - 1))) - xOffset, 0, (3e3 + (300 * (waterMult - 1))), config.maxScreenHeight);
    }
}