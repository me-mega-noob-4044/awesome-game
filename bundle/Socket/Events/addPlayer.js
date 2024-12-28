import Player from "../../../backend/logic/Player.js";
import { players, setPlayer } from "../../main.js";
import ClientSideUTILS from "../../constants/utils.js";

export default function addPlayer(data, isClient) {
    let tmp = ClientSideUTILS.findPlayerById(data[0]);

    if (!tmp) {
        tmp = new Player(undefined, data[0], data[1]);
        ClientSideUTILS.setPlayerById(data[0], tmp);
        ClientSideUTILS.setPlayerBySid(data[1], tmp);
        players.push(tmp);
    }

    tmp.spawn();

    if (isClient) {
        setPlayer(tmp);
    }
}