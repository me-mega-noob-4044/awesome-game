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
    layer: 1,
    health: 3200,
    xp: 6e3,
    speed: .001,
    dmg: 12,
    src: "https://i.imgur.com/eKlFlSj.png",
    turnSpeed: .0012,
    scale: 175,
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
    onlyLand: true
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
    onlyLand: true
}, {
    name: "Wolf",
    health: 250,
    xp: 500,
    speed: .0005,
    scale: 105,
    dmg: 3,
    src: "https://i.imgur.com/XOs4Htu.png",
    turnSpeed: .008,
    aggroDistance: 2e3,
    isHostile: true,
    onlyLand: true
}];

export default aiTypes;