import { players } from "../../main.js";

export default function renderNames(mainContext, xOffset, yOffset) {
    for (let i = 0; i < players.length; i++) {
        let tmpObj = players[i];

        if (tmpObj && tmpObj.visible) {
            mainContext.font = "30px Roboto";
            mainContext.fillStyle = "#fff";
            mainContext.textBaseline = "middle";
            mainContext.textAlign = "center";
            mainContext.lineWidth = 11;
            mainContext.lineJoin = "round";
            mainContext.strokeText(
                tmpObj.name,
                tmpObj.x - xOffset,
                tmpObj.y - yOffset - tmpObj.scale * 2
            );

            let offsets = [
                { x: 0, y: 0 },
                { x: .5, y: 0 },
                { x: -.5, y: 0 },
                { x: 0, y: .5 },
                { x: 0, y: -.5 }
            ];

            offsets.forEach(offset => {
                mainContext.fillText(
                    tmpObj.name,
                    tmpObj.x - xOffset + offset.x,
                    tmpObj.y - yOffset - tmpObj.scale * 2 + offset.y
                );
            });
        }
    }
}