import skills from "../../../backend/constants/skills.js";
import { upgradesPoints, upgrades, upgradeDesc } from "../../main.js";
import PacketManager from "../PacketManager.js";

// Not going to make this look any prettier since i don't have good sprites for it

export default function updateUpgrades(age, points) {
    upgrades.innerHTML = "";

    let validSkills = [];
    
    if (points) {
        for (let i = 0; i < skills.length; i++) {
            let skill = skills[i];
    
            if (typeof skill.ages == "number" && skill.ages == age) {
                validSkills.push(skill);
            } else if (typeof skill.ages == "object" && skill.ages.includes(age)) {
                validSkills.push(skill);
            }
        }
    
        if (validSkills.length) {
            for (let i = 0; i < validSkills.length; i++) {
                let element = document.createElement("div");
                element.classList.add("upgrade-item");
                element.style.backgroundImage = `url('${validSkills[i].src}')`;
        
                element.onmouseover = () => {
                    upgradeDesc.style.display = "block";
                    upgradeDesc.innerHTML = `
                        <div style="font-size: 18px; font-weight: 900; width: 100%; text-align: center;">${validSkills[i].name}</div>
                        <div>${validSkills[i].description}</div>
                    `;
                };
        
                element.onclick = () => {
                    upgradeDesc.style.display = "none";
                    upgradeDesc.innerText = "";
    
                    PacketManager.sendUpgrade(validSkills[i].id);
                };
        
                element.onmouseout = () => {
                    upgradeDesc.style.display = "none";
                    upgradeDesc.innerText = "";
                };
        
                upgrades.appendChild(element);
            }
        
            upgradesPoints.innerText = "Upgrade Points: " + points;
        }
    }
}