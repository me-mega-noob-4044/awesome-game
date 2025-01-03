import { itemElements } from "../../main.js"; 

export default function updateReload(id, speed) {
    itemElements[id].style.animation = `reload ${speed / 1e3}s linear`;
    
    setTimeout(() => {
        if (itemElements[id]) itemElements[id].style.animation = "";
    }, speed);
}