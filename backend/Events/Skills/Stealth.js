const duration = 6e3; // 6 seconds

export default function Stealth(player) {
    player.stealthTimer = duration;

    return duration;
}