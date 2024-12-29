import config from "../../../backend/constants/config.js";
import colorConfig from "../constants/colorConfig.js";

export default function renderGround(mainContext, xOffset, yOffset) {
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
}