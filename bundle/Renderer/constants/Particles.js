import renderCircle from "../utils/renderCircle.js";
import colorConfig from "./colorConfig.js";

export default class Particles {
    constructor(sid, x, y, type) {
        this.owner = sid;

        this.x = x;
        this.y = y;
        this.type = type;
        this.orginalScale = this.scale = type == "lava" ? sid >= 0 ? 35 : 20 : 35;

        this.alpha = 1;

        this.active = true;
    }

    render(mainContext, delta) {
        this.scale += delta * (this.type == "lava" ? .0275 : .075);

        if (!this.active) {
            this.scale = this.orginalScale * 1.8;
            this.alpha -= delta * 0.01;

            if (this.alpha <= 0) this.alpha = 0;
        } else if (this.scale >= this.orginalScale * 1.8) {
            this.active = false;
        }

        mainContext.globalAlpha = this.alpha;
        mainContext.fillStyle = this.type == "lava" ? "#ffff00" : colorConfig.snow;
        renderCircle(0, 0, mainContext, this.scale, false, true);
    }
}