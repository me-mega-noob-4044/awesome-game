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
    xp: 3e3,
    speed: .0018,
    dmg: 15,
    src: "https://i.imgur.com/eKlFlSj.png",
    turnSpeed: .0018,
    scale: 105,
    isHostile: true
}, {
    name: "Duck",
    health: 50,
    xp: 25,
    speed: .0032,
    src: "https://i.imgur.com/VYCKtfc.png",
    turnSpeed: .0024,
    scale: 35,
}, {
    name: "Fish",
    src: "https://i.imgur.com/WGUQDaq.png",
    onlyWater: true
}, {
    name: "Sheep",
    health: 300,
    src: "https://i.imgur.com/kHuLwsD.png",
    followRandPlayer: true
}];

export default aiTypes;