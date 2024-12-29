import { particles } from "../../main.js";

export default function renderParticleEffects(mainContext, xOffset, yOffset, delta) {
    mainContext.globalAlpha = 1;

    for (let i = 0; i < particles.length; i++) {
        let tmpObj = particles[i];

        if (tmpObj) {
            mainContext.save();
            mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
            tmpObj.render(mainContext, delta);
            mainContext.restore();

            if (!tmpObj.alpha) {
                particles.splice(i, 1);
                i--;
            }
        }
    }
}