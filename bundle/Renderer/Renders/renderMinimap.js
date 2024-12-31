import { mapContext, player } from "../../main.js";
import config from "../../../backend/constants/config.js";
import renderCircle from "../utils/renderCircle.js";

export default function renderMinimap() {
    mapContext.clearRect(0, 0, 600, 600);

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