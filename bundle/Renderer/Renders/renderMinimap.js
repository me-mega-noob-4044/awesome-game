import { mapContext, player } from "../../main.js";
import config from "../../../backend/constants/config.js";
import renderCircle from "../utils/renderCircle.js";
import colorConfig from "../constants/colorConfig.js";

export default function renderMinimap() { // I'LL ADD THE 2 RIVER LATER
    mapContext.clearRect(0, 0, 600, 600);

    // RIVER ONE:
    mapContext.fillStyle = colorConfig.waterColor;
    mapContext.fillRect(0, ((4e3 - 325) / config.mapScale) * 600, 600, 37.5);

    mapContext.fillStyle = "rgba(0, 0, 70, 0.35)";
    mapContext.fillRect(0, ((4e3 - 325) / config.mapScale) * 600, 600, 37.5);

    // RIVER TWO:
    mapContext.fillStyle = colorConfig.waterColor;
    mapContext.fillRect(0, ((8e3 - 325) / config.mapScale) * 600, 600, 37.5);

    mapContext.fillStyle = "rgba(0, 0, 70, 0.35)";
    mapContext.fillRect(0, ((8e3 - 325) / config.mapScale) * 600, 600, 37.5);

    // SNOW:
    mapContext.fillStyle = colorConfig.snow;
    mapContext.fillRect(0, 0, 600, config.snowBiomeEndY / config.mapScale * 600);

    mapContext.fillStyle = "rgba(0, 0, 70, 0.35)";
    mapContext.fillRect(0, 0, 600, config.snowBiomeEndY / config.mapScale * 600);

    // DESSERT:
    mapContext.fillStyle = colorConfig.sandColor;
    mapContext.fillRect(0, (config.mapScale - 2e3) / config.mapScale * 600, 600, 2e3 / config.mapScale * 600);

    mapContext.fillStyle = "rgba(0, 0, 70, 0.35)";
    mapContext.fillRect(0, (config.mapScale - 2e3) / config.mapScale * 600, 600, 2e3 / config.mapScale * 600);

    // OCEAN ONE:
    mapContext.fillStyle = colorConfig.waterColor;
    mapContext.fillRect(0, 0, 3e3 / config.mapScale * 600, 600);

    mapContext.fillStyle = "rgba(0, 0, 70, 0.35)";
    mapContext.fillRect(0, 0, 3e3 / config.mapScale * 600, 600);

    // OCEAN TWO:
    mapContext.fillStyle = colorConfig.waterColor;
    mapContext.fillRect(((config.mapScale - 3e3) / config.mapScale) * 600, 0, 3e3 / config.mapScale * 600, 600);

    mapContext.fillStyle = "rgba(0, 0, 70, 0.35)";
    mapContext.fillRect(((config.mapScale - 3e3) / config.mapScale) * 600, 0, 3e3 / config.mapScale * 600, 600);

    if (player) {
        mapContext.fillStyle = "white";
        renderCircle(
            player.x / config.mapScale * 600,
            player.y / config.mapScale * 600,
            mapContext,
            10,
            false,
            true
        );
    }
}