import { animText } from "../../main.js";

export default function renderAnimText(mainContext, xOffset, yOffset, delta) {
    mainContext.globalAlpha = 1;

    for (let i = 0; i < animText.length; i++) {
        let tmpObj = animText[i];

        if (tmpObj) {
            mainContext.save();
            mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
            tmpObj.render(mainContext, delta);
            mainContext.restore();

            if (!tmpObj.active) {
                animText.splice(i, 1);
                i--;
            }
        }
    }
}