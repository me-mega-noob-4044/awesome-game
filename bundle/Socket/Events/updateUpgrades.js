import skills, { generateSVG } from "../../../backend/constants/skills.js";
import { upgradesPoints, upgrades } from "../../main.js";

export default function updateUpgrades(age, points) {
    upgrades.innerHTML = "";

    let validSkills = [];
    
    for (let i = 0; i < skills.length; i++) {
        let skill = skills[i];

        if (typeof skill.ages == "number" && skill.ages == age) {
            validSkills.push(skill);
        } else if (typeof skill.ages == "object" && skill.ages.includes(age)) {
            validSkills.push(skill);
        }
    }

    for (let i = 0; i < validSkills.length; i++) {
        upgrades.innerHTML += `
        <div>
        </div>
        `;
    }

    upgradesPoints.innerText = "Upgrade Points: " + points;

    // console.log(age, points, validSkills);
}