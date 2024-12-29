import { players } from "../../main.js";
import ClientSideUTILS from "../../constants/utils.js";

export default function removePlayer(sid) {
    let player = ClientSideUTILS.findPlayerBySid(sid);

    ClientSideUTILS.removePlayerBySid(sid);
    ClientSideUTILS.removePlayerById(player.id);

    let indx = players.indexOf(player);
    players.splice(indx, 1);
}