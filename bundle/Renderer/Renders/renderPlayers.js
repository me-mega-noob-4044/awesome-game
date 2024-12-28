import { players } from "../../main.js";
import colorConfig from "../constants/colorConfig.js";
import renderCircle from "../utils/renderCircle.js";

export default function renderPlayers(mainContext, xOffset, yOffset) {
    mainContext.globalAlpha = 1;

    for (let i = 0; i < players.length; i++) {
        let tmpObj = players[i];

        if (tmpObj) {
            mainContext.save();
            mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);

            mainContext.lineWidth = 5.5;
            mainContext.fillStyle = colorConfig.defaultSkinColor;
            mainContext.strokeStyle = colorConfig.outlineColor;
            renderCircle(mainContext, tmpObj.scale);

            mainContext.restore();
        }
    }
}