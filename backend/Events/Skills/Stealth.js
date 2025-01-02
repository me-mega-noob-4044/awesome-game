import Packets from "../../constants/Packets.js";

const duration = 6e3; // 6 seconds

export default function Stealth(player) {
    player.stealthTimer = duration;
    player.send(Packets.SERVER_TO_CLIENT.UPDATE_EFFECTS, "stealthTimer", duration);

    return duration;
}