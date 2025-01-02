import { player, itemHolder, itemElements } from "../../main.js";
import skills from "../../../backend/constants/skills.js";

const tmp = [];

export default function updateItems(id) {
    if (typeof id == "object") {
        tmp.forEach(element => element.remove());
        
        tmp.length = 0;
        itemElements.length = 0;
        return;
    }
    player.items.push(id);

    let skill = skills[id];

    if (!skill) return;

    let element = document.createElement("div");
    element.classList.add("item");

    let background = document.createElement("div");
    background.classList.add("item-reload");

    let icon = document.createElement("div");
    icon.classList.add("item-icon");
    icon.style.backgroundImage = `url('${skill.src}')`;

    element.appendChild(icon);
    element.appendChild(background);

    itemElements.push(background);
    tmp.push(element);
    itemHolder.appendChild(element);
}