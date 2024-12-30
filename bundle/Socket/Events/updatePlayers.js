import { players, lastMoveDir, gameObjects, player, particles } from "../../main.js";
import Particles from "../../Renderer/constants/Particles.js";
import ClientSideUTILS from "../../constants/utils.js";
import PacketManager from "../PacketManager.js";
import config from "../../../backend/constants/config.js";
import UTILS from "../../../backend/constants/utils.js";

// sid, x, y, dir

export default function updatePlayers(data) {
    let tmpTime = Date.now();

    for (let i = 0; i < players.length; i++) {
        players[i].forcePos = !players[i].visible;
        players[i].visible = false;
    }

    for (let i = 0; i < data.length;) {
        let tmpObj = ClientSideUTILS.findPlayerBySid(data[i]);

        if (tmpObj) {
            tmpObj.t1 = (tmpObj.t2 === undefined) ? tmpTime : tmpObj.t2;
            tmpObj.t2 = tmpTime;

            tmpObj.x1 = tmpObj.x;
            tmpObj.y1 = tmpObj.y;
            tmpObj.x2 = data[i + 1];
            tmpObj.y2 = data[i + 2];

            tmpObj.d1 = (tmpObj.d2 == undefined) ? data[i + 3] : tmpObj.d2;
            tmpObj.d2 = data[i + 3];
            tmpObj.dt = 0;

            tmpObj.visible = true;

            if (!particles.find(e => e.active && e.owner == tmpObj.sid)) {
                for (let t = 0; t < gameObjects.length; t++) {
                    let gameObject = gameObjects[t];
            
                    if (gameObject && gameObject.active && gameObject.name == "pond" && gameObject.y + gameObject.scale > config.snowBiomeEndY) {
                        if (UTILS.getDistance(gameObject, player) <= gameObject.scale) {
                            particles.push(new Particles(tmpObj.sid, tmpObj.x, tmpObj.y, "pond"));
                        }
                    }
                }
            }
        }

        i += 4;
    }

    PacketManager.sendMove(lastMoveDir);
}