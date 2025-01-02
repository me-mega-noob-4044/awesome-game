import Packets from "../constants/Packets.js";
import skills from "../constants/skills.js";

export default function sendUpgrade(ws, id) {
    let player = ws.NEW_CLIENT;

    if (!player) return;
    if (player.upgradeAge > 12) return;

    let skill = skills[id];

    if (!skill) return ws.close(4001, "Invalid upgrade");

    if (skill.ages == player.upgradeAge || (typeof skill.ages == "object" && skill.ages.includes(player.upgradeAge))) {
        if (player.upgradePoints > 0) {
            player.upgradePoints--;

            if (skill.healthIncrease) {
                player.maxHealth += skill.healthIncrease;
                player.health += skill.healthIncrease;

                player.send(Packets.SERVER_TO_CLIENT.UPDATE_HEALTH, player.health, player.maxHealth);
            } else if (skill.regenRateIncrease) {
                player.regenRate -= skill.regenRateIncrease;
            } else if (skill.regenPowerIncrease) {
                player.regenPower += skill.regenPowerIncrease;
            } else if (skill.attackPowerIncrease) {
                player.attackMlt += skill.attackPowerIncrease;
            } else {
                if (player.items.includes(skill.id)) return ws.close(4001, "Invalid upgrade");

                player.items.push(skill.id);

                player.send(Packets.SERVER_TO_CLIENT.UPDATE_ITEMS, skill.id);
            }

            player.upgradeAge++;
            if (player.upgradeAge > 12) {
                player.upgradePoints = 0;
                player.upgradeAge = 0;
            }
        }
    } else {
        ws.close(4001, "Invalid upgrade");
    }

    player.send(Packets.SERVER_TO_CLIENT.UPDATE_UPGRADES, player.upgradeAge, player.upgradePoints);
}