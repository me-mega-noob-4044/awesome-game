import UTILS from "../../../backend/constants/utils.js";
import { leaderboardDisplay } from "../../main.js";

export default function updateLeaderboard(data) {
    leaderboardDisplay.innerHTML = "";

    for (let i = 0; i < data.length; i += 2) {
        leaderboardDisplay.innerHTML += `
        <div class="leaderboard-item">
        ${Math.floor(i / 2) + 1}. {${data[i + 1]}} ${data[i]} <span style="float: right; margin-right: 6px;">${UTILS.kFormat(data[i + 2])}</span>
        </div>
        `;
    }
}