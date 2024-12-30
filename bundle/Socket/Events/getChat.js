import ClientSideUTILS from "../../constants/utils.js";

export default function getChat(sid, msg) {
    let player = ClientSideUTILS.findPlayerBySid(sid);

    if (player) {
        player.chatMsg = msg;
        player.chatTimer = 3e3;
    }
}