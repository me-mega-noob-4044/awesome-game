const config = {
    playerInitHealth: 100,
    playerMaxLevel: 5,
    playerRegenerationRate: 10e3, // Regens every 10 seconds
    playerRegenerationPower: 10, // Regens 10 hit points
    mapScale: 5e3,
    maxScreenWidth: 1980,
    maxScreenHeight: 1080,
    serverUpdateSpeed: 1e3 / 9,
    playerSpeed: .0016, // .0016
    playerDecel: .993,
    icePlayerDecel: .999,
    snowBiomeEndY: 1500, // 30% of map
    waveSpeed: .000025,
    waveMax: 1.05
};

export default config;