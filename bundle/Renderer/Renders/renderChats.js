import { players } from "../../main.js";

export default function renderChats(mainContext, xOffset, yOffset, delta) {
    mainContext.globalAlhpa = 1;

    for (let i = 0; i < players.length; i++) {
        let tmpObj = players[i];

        if (tmpObj && tmpObj.visible && tmpObj.chatTimer > 0) {
            tmpObj.chatTimer -= delta;
            if (tmpObj.chatTimer <= 0) tmpObj.chatTimer = 0;

            mainContext.font = "24px Roboto";
            mainContext.textAlign = "center";
            mainContext.textBaseline = "middle";

            let size = mainContext.measureText(tmpObj.chatMsg);

            let tmpX = tmpObj.x - xOffset;
            let tmpY = tmpObj.y - yOffset;

            mainContext.fillStyle = "rgba(0, 0, 0, .35)";
            mainContext.fillRect(
                tmpX - size.width / 2 - 8.5,
                tmpY - tmpObj.scale * 3 - 30,
                size.width + 17, 
                40
            );

            mainContext.fillStyle = "white";
            mainContext.fillText(tmpObj.chatMsg, tmpX, tmpY - tmpObj.scale * 2 - 45);
        }
    }
}