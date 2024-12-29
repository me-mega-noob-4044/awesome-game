import ClientSideUTILS from "../../constants/utils.js";

export default function hitAnimation(sid, indx) {
    let player = ClientSideUTILS.findPlayerBySid(sid);

    if (player) {
        player.handAnimations[indx] = 200;
    }
}