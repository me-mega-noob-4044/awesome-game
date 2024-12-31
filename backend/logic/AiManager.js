import AI from "./AI.js";
import aiTypes from "../constants/aiTypes.js";
import { ais, players } from "../../index.js";

export default class AiManager {
    static add(aiId, x, y) {
        ais.push(new AI(aiTypes[aiId], x, y, ais.length));
    }
}