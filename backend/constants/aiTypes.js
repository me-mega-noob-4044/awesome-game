const aiTypes = [{
    name: "Webpack Config Js",
    health: Infinity,
    xp: Infinity,
    speed: Infinity,
    dmg: Infinity,
    turnSpeed: 1, // Instant
    scale: 505
}, {
    name: "Dragon",
    health: 3200,
    xp: 6e3,
    speed: .001,
    dmg: 15,
    src: "https://i.imgur.com/eKlFlSj.png",
    turnSpeed: .0012,
    scale: 155,
    aggroDistance: 1200,
    avoidObjects: true,
    volcanoAi: true,
    isHostile: true
}, {
    name: "Duck",
    health: 50,
    xp: 50,
    speed: .0008,
    src: "https://i.imgur.com/VYCKtfc.png",
    turnSpeed: .0024,
    scale: 70,
}, {
    name: "Fish",
    health: 100,
    xp: 80,
    speed: .0008,
    scale: 70,
    src: "https://i.imgur.com/WGUQDaq.png",
    turnSpeed: .0018,
    onlyWater: true
}, {
    name: "Sheep",
    health: 175,
    xp: 300,
    speed: .00042,
    scale: 95,
    src: "https://i.imgur.com/kHuLwsD.png",
    turnSpeed: .005,
    followRandPlayer: true
}];

export default aiTypes;