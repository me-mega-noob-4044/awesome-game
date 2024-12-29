import ObjectManager from "../../../backend/logic/ObjectManager.js";
import { gameObjects } from "../../main.js";
import buildingData from "../../../backend/constants/buildingData.js";

// tmpObj.sid, tmpObj.x, tmpObj.y, tmpObj.sid, tmpObj.id

export default function loadGameObjects(data) {
    for (let i = 0; i < data.length; i += 5) {
        ObjectManager.add(data[i + 4], data[i + 1], data[i + 2], data[i + 3], gameObjects);
    }

    console.log(gameObjects);
}