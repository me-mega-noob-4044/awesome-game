import { player } from "../../main.js";

export default function updateEffects(type, duration) {
    player[type] = duration;
}