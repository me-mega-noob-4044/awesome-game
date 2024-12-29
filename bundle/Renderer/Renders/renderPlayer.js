import colorConfig from "../constants/colorConfig.js";
import renderCircle from "../utils/renderCircle.js";

/**
 * haha copy how moo does rendering ez
 */

export default function renderPlayer(tmpObj, mainContext) {
    let hand1Angle = Math.PI / 4;
    let hand2Angle = -Math.PI / 4;

    mainContext.lineWidth = 5.5;
    mainContext.fillStyle = colorConfig.defaultSkinColor;
    mainContext.strokeStyle = colorConfig.outlineColor;

    renderCircle(
        Math.cos(hand1Angle) * tmpObj.scale,
        Math.sin(hand1Angle) * tmpObj.scale,
        mainContext,
        17
    );

    renderCircle(
        Math.cos(hand2Angle) * tmpObj.scale,
        Math.sin(hand2Angle) * tmpObj.scale,
        mainContext,
        17
    );

    renderCircle(0, 0, mainContext, tmpObj.scale);
}