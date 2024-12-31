import { chatLog } from "../main.js";

export default function LogMsg(player, msg) {
    msg = msg.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    chatLog.innerHTML += `
    <div>
        <span style="color: white;">${player.name} - ${msg}</span>
    </div>
    `;
}