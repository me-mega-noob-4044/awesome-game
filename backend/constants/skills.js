
/**
 * Made these images from google drawings :sob:
 * pls send sprites for me to use :pensive:
 */

// 2, 4, 6, 8, 10 - Stat increase levles

// 3, 5, 7, 9 - Abilities levels

const skills = [{
    id: 0,
    name: "Increase health",
    description: "increases the player's maximum health by 25 hit points",
    healthIncrease: 25,
    src: "https://i.imgur.com/eTxL0gF.png", // Placeholder image
    ages: [2, 4, 10, 11, 12]
}, {
    id: 1,
    name: "Increase regen rate",
    description: "increases the player's regeneration rate by 1 second",
    regenRateIncrease: 1e3,
    src: "https://i.imgur.com/NqOhbrs.png", // Placeholder image
    ages: [2, 4, 10, 11, 12]
}, {
    id: 2,
    name: "Increase regen power",
    description: "increases the player's regeneration power by 10 hit points",
    regenPowerIncrease: 10,
    src: "https://i.imgur.com/r5Gsc0t.png", // Placeholder image
    ages: [2, 4, 10, 11, 12]
}, {
    id: 3,
    name: "Increase attack power",
    description: "increases the player's damage output by +10%",
    attackPowerIncrease: .1,
    src: "https://i.imgur.com/8wDJ8hJ.png", // Placeholder image
    ages: [2, 4, 10, 11, 12]
}, {
    id: 4,
    name: "Increase health",
    description: "increases the player's maximum health by 50 hit points",
    healthIncrease: 50,
    src: "https://i.imgur.com/eTxL0gF.png", // Placeholder image
    ages: [6, 8]
}, {
    id: 5,
    name: "Increase regen rate",
    description: "increases the player's regeneration rate by 3 seconds",
    regenRateIncrease: 3e3,
    src: "https://i.imgur.com/NqOhbrs.png", // Placeholder image
    ages: [6, 8]
}, {
    id: 6,
    name: "Increase regen power",
    description: "increases the player's regeneration power by 30 hit points",
    regenPowerIncrease: 30,
    src: "https://i.imgur.com/r5Gsc0t.png", // Placeholder image
    ages: [6, 8]
}, {
    id: 7,
    name: "Increase attack power",
    description: "increases the player's damage output by +25%",
    attackPowerIncrease: .25,
    src: "https://i.imgur.com/8wDJ8hJ.png", // Placeholder image
    ages: [6, 8]
}, {
    id: 8,
    name: "Fireball",
    description: "short range fireball attacks, quick cooldown and effective against multiple targets",
    speed: 5e3, // 5 second cooldown
    src: "https://i.imgur.com/BwwOJrQ.png",
    ages: [3, 5]
}, {
    id: 9,
    name: "Stove",
    description: "devastating short range aoe attack, slow cooldown and effective against multiple targets",
    speed: 20e3, // 20 second cooldown
    src: "https://i.imgur.com/QSF5DpJ.png",
    ages: [3, 5, 9]
}, {
    id: 10,
    name: "Stealth",
    description: "player becomes invisible for a short duration, effective for escaping or sneaking up on enemies",
    speed: 30e3, // 30 second cooldown
    src: "https://i.imgur.com/aQmYFcf.png",
    ages: [3, 5]
}, {
    id: 11,
    name: "Dash",
    description: "player gains a short burst of speed, effective for escaping or chasing down enemies",
    speed: 3e3, // 3 second cooldown
    src: "https://i.imgur.com/UsOI21h.png",
    ages: [3, 5, 9]
}, {
    id: 12,
    name: "Fortify",
    description: "player gains large amount of temporary health, effective for tanking damage",
    speed: 30e3, // 30 second cooldown
    src: "https://i.imgur.com/JYQwZR2.png",
    ages: [5, 7, 9]
}, {
    id: 13,
    name: "Teleportation",
    description: "player instantly teleports to a target location and triggers an weak aoe attack",
    speed: 30e3, // 30 second cooldown
    src: "https://i.imgur.com/C3A8PDT.png",
    ages: [7, 9]
}, {
    id: 14,
    name: "Dome",
    description: "creates a dome where it forces enemies to go close range",
    speed: 25e3, // 25 second cooldown
    src: "https://i.imgur.com/uAk1pa0.png",
    ages: [7, 9]
}, {
    id: 15,
    name: "Regeneration",
    description: "regeneration is accerated for a short duration but player is unable to move",
    speed: 15e3, // 15 second cooldown
    src: "https://i.imgur.com/g8oKYsk.png",
    ages: [3, 7, 9]
}, {
    id: 16,
    name: "Rook",
    description: "player becomes invulnerable until the player either attacks or moves",
    speed: 30e3, // 30 second cooldown
    src: "https://i.imgur.com/XA7c6Q3.png",
    ages: [9]
}, {
    id: 17,
    name: "Bloodborne",
    description: "player gains temporary health and damage for each nearby enemy",
    speed: 20e3, // 20 second cooldown
    src: "https://i.imgur.com/ZbzpRfk.png",
    ages: [9]
}, {
    id: 18,
    name: "Kamikaze",
    description: "player gains increased speed and damage but loses health over time",
    speed: 5e3, // 5 second cooldown
    src: "https://i.imgur.com/plxJWAh.png",
    ages: [3, 7, 9]
}, {
    id: 19,
    name: "Homing Arrow",
    description: "a homing arrow that deals damage to the nearest enemy",
    speed: 20e3, // 5 second cooldown
    src: "https://i.imgur.com/8dVMNB9.png",
    ages: [5, 7]
}, {
    id: 20,
    name: "Submerge",
    description: "player becomes invisible when on water, stops when player attacks or gets out of water",
    speed: 30e3,
    src: "https://i.imgur.com/jRgw8rv.png",
    ages: [3, 5, 7, 9]
}];

export default skills;