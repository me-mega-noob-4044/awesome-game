import { leaderboard } from "../../main.js";

export default function updateLeaderboard(data) {
    leaderboard.innerHTML = "";

    for (let i = 0; i < data.length; i += 2) {
        let item = document.createElement("div");
        item.classList.add("leaderboard-item");

        item.innerHTML = "supermannn";

        leaderboard.appendChild(item);
    }
}