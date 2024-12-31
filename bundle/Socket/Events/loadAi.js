import { ais } from "../../main.js";
import AI from "../../../backend/logic/AI.js";
import ClientSideUTILS from "../../constants/utils.js";
import AiManager from "../../../backend/logic/AiManager.js";

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

    for (let i = 0; i < data.length; i++) {
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

            tmpObj.x2 = tmpObj.x;
            tmpObj.y2 = tmpObj.y;
            tmpObj.d2 = tmpObj.dir;

            tmpObj.health = data[i + 5];

            tmpObj.forcePos = true;
            tmpObj.visible = true;
        }
    }
}