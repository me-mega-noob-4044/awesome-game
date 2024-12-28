import { players } from "../../main.js";
import ClientSideUTILS from "../../constants/utils.js";

// sid, x, y, dir

export default function updatePlayers(data) {
    let tmpTime = Date.now();

    for (let i = 0; i < players.length; i++) {
        players[i].visible = false;
    }

    for (let i = 0; i < data.length;) {
        let tmpObj = ClientSideUTILS.findPlayerBySid(data[i]);

        if (tmpObj) {
            tmpObj.t1 = (tmpObj.t2 === undefined) ? tmpTime: tmpObj.t2;
            tmpObj.t2 = tmpTime;
            tmpObj.x1 = tmpObj.x;
            tmpObj.y1 = tmpObj.y;
            tmpObj.x2 = data[i + 1];
            tmpObj.y2 = data[i + 2];
            tmpObj.d1 = (tmpObj.d2 == undefined) ? data[i + 3] : tmpObj.d2;
            tmpObj.d2 = data[i + 3]; // dir
            tmpObj.visible = true;
        }

        i += 4;
    }
}