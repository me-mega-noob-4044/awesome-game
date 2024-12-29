import { gameUI, mainMenu } from "../../main.js";

export default function killPlayer() {
    mainMenu.style.display = "flex";
    gameUI.style.display = "none";
}