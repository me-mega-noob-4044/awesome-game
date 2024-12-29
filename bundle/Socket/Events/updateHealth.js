import { healthDisplay, healthText } from "../../main.js";

export default function updateHealth(current, max) {
    healthDisplay.style.width = `${(current / max) * 100}%`;
    healthText.innerText = `${current}/${max}`;
}