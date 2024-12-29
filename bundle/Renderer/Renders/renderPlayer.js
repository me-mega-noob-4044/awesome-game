import colorConfig from "../constants/colorConfig.js";
import renderCircle from "../utils/renderCircle.js";

/**
 * haha copy how moo does rendering ez
 */

export default function renderPlayer(tmpObj, mainContext, delta) {
    let hand1Angle = Math.PI / 4;
    let hand2Angle = -Math.PI / 4;

    mainContext.lineWidth = 5.5;
    mainContext.fillStyle = colorConfig.defaultSkinColor;
    mainContext.strokeStyle = colorConfig.outlineColor;

    if (tmpObj.handAnimations[0]) {
        let indx = 1 - (tmpObj.handAnimations[0] / 200);

        if (indx < .5) {
            indx /= .5;

            renderCircle(
                Math.cos(hand1Angle - (indx * hand1Angle)) * (tmpObj.scale * 1.8 - indx),
                Math.sin(hand1Angle - (indx * hand1Angle)) * (tmpObj.scale * 1.8 - indx),
                mainContext,
                17
            );
        } else {
            indx = Math.abs(.5 - indx);
            indx /= .5;

            renderCircle(
                Math.cos(indx * hand1Angle) * (tmpObj.scale * 1.8 - indx),
                Math.sin(indx * hand1Angle) * (tmpObj.scale * 1.8 - indx),
                mainContext,
                17
            );
        }

        tmpObj.handAnimations[0] -= delta;
        if (tmpObj.handAnimations[0] <= 0) {
            tmpObj.handAnimations[0] = 0;
        }
    } else {
        renderCircle(
            Math.cos(hand1Angle) * tmpObj.scale,
            Math.sin(hand1Angle) * tmpObj.scale,
            mainContext,
            17
        );
    }

    if (tmpObj.handAnimations[1]) {
        let indx = 1 - (tmpObj.handAnimations[1] / 200);

        if (indx >= .5) {
            indx = Math.abs(.5 - indx);
            indx /= .5;

            renderCircle(
                Math.cos(hand2Angle - (indx * hand1Angle)) * (tmpObj.scale * 1.8 - indx),
                Math.sin(hand2Angle - (indx * hand1Angle)) * (tmpObj.scale * 1.8 - indx),
                mainContext,
                17
            );
        } else {
            indx /= .5;

            renderCircle(
                Math.cos(indx * hand2Angle) * (tmpObj.scale * 1.8 - indx),
                Math.sin(indx * hand2Angle) * (tmpObj.scale * 1.8 - indx),
                mainContext,
                17
            );
        }

        tmpObj.handAnimations[1] -= delta;
        if (tmpObj.handAnimations[1] <= 0) {
            tmpObj.handAnimations[1] = 0;
        }
    } else {
        renderCircle(
            Math.cos(hand2Angle) * tmpObj.scale,
            Math.sin(hand2Angle) * tmpObj.scale,
            mainContext,
            17
        );
    }

    renderCircle(0, 0, mainContext, tmpObj.scale);
}