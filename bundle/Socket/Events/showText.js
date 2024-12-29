import Text from "../utils/Text.js";
import { animText } from "../../main.js";

export default function showText(x, y, value, doer) {
    animText.push(new Text(x, y, Math.abs(value), value > 0 ? "#0f0" : doer ? "#f00" : "#fff"));
}