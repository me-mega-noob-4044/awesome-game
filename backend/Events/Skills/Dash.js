export default function Dash(player) {
    let dir = player.moveDir;

    if (dir == undefined || dir == null) dir = player.dir;

    player.xVel += Math.cos(dir) * 2;
    player.yVel += Math.sin(dir) * 2;

    return 0;
}