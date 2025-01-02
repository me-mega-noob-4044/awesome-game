
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
    ages: [2, 4, 10]
}, {
    id: 1,
    name: "Increase regen rate",
    description: "increases the player's regeneration rate by .5 seconds",
    regenRateIncrease: 500,
    src: "https://i.imgur.com/NqOhbrs.png", // Placeholder image
    ages: [2, 4, 10]
}, {
    id: 2,
    name: "Increase regen power",
    description: "increases the player's regeneration power by 10 hit points",
    regenPowerIncrease: 10,
    src: "https://i.imgur.com/r5Gsc0t.png", // Placeholder image
    ages: [2, 4, 10]
}, {
    id: 3,
    name: "Increase attack power",
    description: "increases the player's damage output by +10%",
    attackPowerIncrease: .1,
    src: "https://i.imgur.com/8wDJ8hJ.png", // Placeholder image
    ages: [2, 4, 10]
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
    description: "increases the player's regeneration rate by 2 seconds",
    regenRateIncrease: 2e3,
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
    ages: [3, 5, 9]
}, {
    id: 9,
    name: "Stove",
    description: "devastating short range aoe attack, slow cooldown and effective against multiple targets",
    speed: 20e3, // 20 second cooldown
    src: "https://i.imgur.com/BwwOJrQ.png", // need tmp sprite
    ages: [3, 5, 9]
}, {
    id: 10,
    name: "Stealth",
    description: "player becomes invisible for a short duration, effective for escaping or sneaking up on enemies",
    speed: 30e3, // 30 second cooldown
    src: "https://i.imgur.com/BwwOJrQ.png", // need tmp sprite
    ages: [3, 5]
}, {
    id: 11,
    name: "Dash",
    description: "player gains a short burst of speed, effective for escaping or chasing down enemies",
    speed: 1e3, // 1 second cooldown
    src: "https://i.imgur.com/BwwOJrQ.png", // need tmp sprite
    ages: [3, 5, 7, 9]
}];

export default skills;