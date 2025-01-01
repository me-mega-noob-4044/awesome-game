export function generateSVG(name) {
    if (name == "Increase health") {
        return `
        <svg>
        </svg>
        `;
    } else {
        return "";
    }
}

const skills = [{
    name: "Increase health",
    description: "increases the player's maximum health",
    healthIncrease: 25,
    src: generateSVG("Increase health"),
    ages: [2, 4, 6, 8, 10]
}, {
    name: "Increase regen rate",
    description: "increases the player's regeneration rate",
    regenRateIncrease: 500, // Increases regen rate by 1 second
    src: generateSVG("Increase regen rate"),
    ages: [2, 4, 6, 8, 10]
}, {
    name: "Increase regen power",
    description: "increases the player's regeneration power",
    regenPowerIncrease: 5, // Increases regen power by 5 hit points
    src: generateSVG("Increase regen power"),
    ages: [2, 4, 6, 8, 10]
}];

export default skills;