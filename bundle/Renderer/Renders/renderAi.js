import { ais } from "../../main.js";

var imageCache = {};

function getImage(src) {
    let image = imageCache[src];

    if (!image) {
        image = new Image();
        image.src = src;
        imageCache[src] = image;
    }

    return image;
}

export default function renderAi(mainContext, xOffset, yOffset, layer) {
    mainContext.globalAlpha = 1;

    for (let i = 0; i < ais.length; i++) {
        let tmpObj = ais[i];

        if (tmpObj && tmpObj.visible && tmpObj.layer == layer) {
            mainContext.save();
            mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
            mainContext.rotate(tmpObj.dir - (tmpObj.freeXP ? 0 : Math.PI / 2));
            
            let image = getImage(tmpObj.src);
            mainContext.drawImage(image, -tmpObj.scale, -tmpObj.scale, tmpObj.scale * 2, tmpObj.scale * 2);

            mainContext.restore();
        }
    }
}