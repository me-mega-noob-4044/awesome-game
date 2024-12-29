import config from "../../../backend/constants/config.js";

export default function renderMapBorders(mainContext, xOffset, yOffset) {
    mainContext.fillStyle = "#000";
    mainContext.globalAlpha = 0.09;

    if (xOffset <= 0) {
        mainContext.fillRect(0, 0, -xOffset, config.maxScreenHeight);
    }
    
    if (config.mapScale - xOffset <= config.maxScreenWidth) {
        let tmpY = Math.max(0, -yOffset);

        mainContext.fillRect(
            config.mapScale - xOffset,
            tmpY,
            config.maxScreenWidth - (config.mapScale - xOffset),
            config.maxScreenHeight - tmpY
        );
    }
    
    if (yOffset <= 0) {
        mainContext.fillRect(
            -xOffset, 
            0, 
            config.maxScreenWidth + xOffset, 
            -yOffset
        );
    }
    
    if (config.mapScale - yOffset <= config.maxScreenHeight) {
        let tmpX = Math.max(0, -xOffset);
        let tmpMin = 0;
        if (config.mapScale - xOffset <= config.maxScreenWidth) tmpMin = config.maxScreenWidth - (config.mapScale - xOffset);

        mainContext.fillRect(
            tmpX,
            config.mapScale - yOffset,
            (config.maxScreenWidth - tmpX) - tmpMin,
            config.maxScreenHeight - (config.mapScale - yOffset)
        );
    }
}