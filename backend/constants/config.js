const config = {
    playerInitHealth: 100,
    playerMaxLevel: 5,
    playerRegenerationRate: 10e3, // Regens every 10 seconds
    playerRegenerationPower: 10, // Regens 10 hit points
    mapScale: 5e3,
    maxScreenWidth: 1980,
    maxScreenHeight: 1080,
    serverUpdateSpeed: 1e3 / 9,
    playerSpeed: .0016,
    playerDecel: .993,
    snowBiomeEndY: 1e3 // 20% of map
};

export default config;