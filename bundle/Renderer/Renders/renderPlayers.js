import { players } from "../../main.js";
import renderPlayer from "./renderPlayer.js";
import Client from "../../Socket/Client.js";

export default function renderPlayers(mainContext, xOffset, yOffset, delta) {
    mainContext.globalAlpha = 1;

    for (let i = 0; i < players.length; i++) {
        let tmpObj = players[i];

        if (tmpObj && tmpObj.visible) {
            mainContext.save();
            mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
            mainContext.rotate(tmpObj.sid == Client.playerSID ? Client.getDir() : tmpObj.dir);

            tmpObj.stealthTimer -= delta;
            if (tmpObj.stealthTimer <= 0) tmpObj.stealthTimer = 0;
            
            if (tmpObj.stealthTimer) {
                mainContext.globalAlpha = .6;
                mainContext.globalCompositeOperation = "source-over";
            }

            renderPlayer(tmpObj, mainContext, delta);

            mainContext.restore();
        }
    }
}