import { ais, particles, gameObjects } from "../../main.js";
import AI from "../../../backend/logic/AI.js";
import ClientSideUTILS from "../../constants/utils.js";
import Particles from "../../Renderer/constants/Particles.js";
import config from "../../../backend/constants/config.js";
import UTILS from "../../../backend/constants/utils.js";

/*
ai.sid, 0
ai.id, 1
ai.x, 2
ai.y, 3
ai.dir, 4
ai.health 5
*/

export default function loadAi(data) {
    let tmpTime = Date.now();

    for (let i = 0; i < ais.length; i++) {
        ais[i].forcePos = !ais[i].visible;
        ais[i].visible = false;
    }

    for (let i = 0; i < data.length;) {
        let tmpObj = ClientSideUTILS.findAiBySid(data[i]);

        if (tmpObj) {
            tmpObj.t1 = (tmpObj.t2 === undefined) ? tmpTime : tmpObj.t2;
            tmpObj.t2 = tmpTime;

            tmpObj.x1 = tmpObj.x;
            tmpObj.y1 = tmpObj.y;

            tmpObj.x2 = data[i + 2];
            tmpObj.y2 = data[i + 3];

            tmpObj.d1 = (tmpObj.d2 === undefined) ? data[i + 4] : tmpObj.d2;
            tmpObj.d2 = data[i + 4];

            tmpObj.health = data[i + 5];

            tmpObj.dt = 0;
            tmpObj.visible = true;
        } else {
            tmpObj = new AI(data[i + 1], data[i + 2], data[i + 3], data[i]);
            ais.push(tmpObj);

            ClientSideUTILS.setAiBySid(data[i], tmpObj);

            tmpObj.x2 = tmpObj.x;
            tmpObj.y2 = tmpObj.y;
            tmpObj.d2 = tmpObj.dir;

            tmpObj.health = data[i + 5];

            tmpObj.forcePos = true;
            tmpObj.visible = true;
        }

        let sidId = `animal:${tmpObj.sid}`;

        if (!particles.find(e => e.active && e.owner == sidId)) {
            let done = false;

            for (let t = 0; t < gameObjects.length; t++) {
                let gameObject = gameObjects[t];
        
                if (gameObject && gameObject.active && (gameObject.name == "lava pond" || gameObject.name == "pond") && gameObject.y + gameObject.scale > config.snowBiomeEndY) {
                    if (UTILS.getDistance(gameObject, tmpObj) <= gameObject.scale) {
                        particles.push(new Particles(sidId, tmpObj.x, tmpObj.y, gameObject.name == "lava pond" ? "lava" : "pond"));
                        done = true;
                        break;
                    }
                }
            }

            if (!done) {
                if (tmpObj.x2 <= 3e3 || tmpObj.x2 >= config.mapScale - 3e3) {
                    particles.push(new Particles(sidId, tmpObj.x, tmpObj.y, "pond"));
                } else if (tmpObj.x2 > 2600 && tmpObj.x2 < config.mapScale - 2600) {
                    if ((tmpObj.y2 >= 3625 && tmpObj.y2 <= 4325) || tmpObj.y2 >= 7625 && tmpObj.y2 <= 8325) {
                        particles.push(new Particles(sidId, tmpObj.x, tmpObj.y, "pond"));
                    }
                }
            }
        }

        i += 6;
    }
}