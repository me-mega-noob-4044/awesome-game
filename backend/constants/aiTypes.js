const aiTypes = [{
    name: "Webpack Config Js",
    health: Infinity,
    xp: Infinity,
    speed: 0,
    dmg: Infinity,
    freeXP: true,
    src: "https://i.imgur.com/BNyilQF.png",
    turnSpeed: 0, // Don't turn
    scale: 205
}, {
    name: "Dragon",
    layer: 1,
    health: 3200,
    xp: 6e3,
    speed: .001,
    dmg: 16,
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
    health: 350,
    xp: 450,
    speed: .0016,
    scale: 105,
    dmg: 8,
    src: "https://i.imgur.com/XOs4Htu.png",
    turnSpeed: .005,
    aggroDistance: 800,
    isHostile: true,
    onlyLand: true
}, {
    name: "Node Js",
    health: Infinity,
    xp: Infinity,
    speed: 0,
    dmg: Infinity,
    freeXP: true,
    src: "https://i.imgur.com/X0kS9rJ.png",
    turnSpeed: 0, // Don't turn
    scale: 205
}];

export default aiTypes;