import { player, itemHolder, itemElements } from "../../main.js";
import skills from "../../../backend/constants/skills.js";

export default function updateItems(items) {
    player.items = items;

    for (let i = 0; i < itemElements.length; i++) itemElements[i].remove();
    itemElements.length = 0;

    for (let i = 0; i < items.length; i++) {
        let id = items[i];
        let skill = skills[id];

        if (!skill) continue;

        let element = document.createElement("div");
        element.classList.add("item");
        element.style.backgroundImage = `url('${skill.src}')`;
        
        itemElements.push(element);
        itemHolder.appendChild(element);
    }

    // Update the player's items
}