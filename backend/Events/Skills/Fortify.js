import Packets from "../../constants/Packets.js";

export default function Fortify(player) {
    player.fortify.timer = 6e3;
    player.fortify.health = Math.ceil(player.maxHealth * .75);
    player.fortify.maxHealth = Math.ceil(player.maxHealth * .75);

    player.maxHealth += player.fortify.maxHealth;
    player.health += player.fortify.maxHealth;

    player.send(Packets.SERVER_TO_CLIENT.UPDATE_HEALTH, player.health, player.maxHealth);

    return 6e3;
}