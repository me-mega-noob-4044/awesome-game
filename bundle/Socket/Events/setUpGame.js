import Client from "../Client.js";

export default function setUpGame(playerSID) {
    Client.playerSID = playerSID;

    console.log(playerSID);
}