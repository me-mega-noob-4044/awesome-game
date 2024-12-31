import ClientSideUTILS from "../../constants/utils.js";
import LogMsg from "../../Chat/LogMsg.js";

export default function getChat(sid, msg) {
    let player = ClientSideUTILS.findPlayerBySid(sid);

    if (player) {
        LogMsg(player, msg);

        player.chatMsg = msg;
        player.chatTimer = 3e3;
    }
}