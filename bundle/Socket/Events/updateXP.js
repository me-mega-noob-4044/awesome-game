import { xpDisplay, xpText } from "../../main.js";

export default function updateXP(xp, maxXP) {
    xpText.innerText = `${xp}/${maxXP}`;
    xpDisplay.style.width = `${xp / maxXP * 100}%`;
}