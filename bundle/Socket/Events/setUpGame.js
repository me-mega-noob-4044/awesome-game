import Client from "../Client.js";
import { mainMenu } from "../../main.js";

export default function setUpGame(playerSID) {
    Client.playerSID = playerSID;
    mainMenu.style.display = "none";
}