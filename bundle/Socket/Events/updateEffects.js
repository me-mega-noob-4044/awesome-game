import ClientSideUTILS from "../../constants/utils.js";

export default function updateEffects(sid, type, duration) {
    let player = ClientSideUTILS.findPlayerBySid(sid);

    if (player) player[type] = duration;
}