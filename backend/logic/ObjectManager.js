import GameObject from "./GameObject.js";
import buildingData from "../constants/buildingData.js";

export default class ObjectManager {
    static add(buildingId, x, y, sid, gameObjects) {
        let data = buildingData.get(buildingId);

        gameObjects.push(new GameObject(x, y, sid, buildingId, data));
    }
}