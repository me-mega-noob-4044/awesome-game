import Player from "../../../backend/logic/Player.js";
import { players, setPlayer, gameUI } from "../../main.js";
import ClientSideUTILS from "../../constants/utils.js";
import Renderer from "../../Renderer/main.js";
import updateItems from "./updateItems.js";

export default function addPlayer(data, isClient) {
    let tmp = ClientSideUTILS.findPlayerById(data[0]);

    if (!tmp) {
        tmp = new Player(undefined, data[0], data[1]);
        ClientSideUTILS.setPlayerById(data[0], tmp);
        ClientSideUTILS.setPlayerBySid(data[1], tmp);
        players.push(tmp);
    }

    tmp.spawn();
    tmp.visible = false;
    tmp.x2 = undefined;
    tmp.y2 = undefined;
    tmp.setData(data);

    if (isClient) {
        gameUI.style.display = "block";
        Renderer.camX = tmp.x;
        Renderer.camY = tmp.y;
        setPlayer(tmp);
        updateItems([]);
    }
}