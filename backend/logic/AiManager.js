import AI from "./AI.js";
import { ais } from "../../index.js";

export default class AiManager {
    static add(aiId, x, y) {
        ais.push(new AI(aiId, x, y, ais.length));
    }
}