import config from "../../constants/config.js";

export default function Kamikaze(player) {
    player.kamikaze.ticks = 6;
    player.attackMlt += .35;
    player.speed += config.kamikazeSpeed;

    return 6e3;
}