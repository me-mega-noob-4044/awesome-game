export default function updateMovement(ws, dir) {
    if (!ws.NEW_CLIENT) return;

    ws.NEW_CLIENT.moveDir = dir;
}