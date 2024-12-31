/*
name: "Dragon",
    health: 600,
    speed: .0018,
    dmg: 15,
    src: "https://i.imgur.com/eKlFlSj.png",
    turnSpeed: .0018,
    scale: 105,
    isHostile: true
*/

import aiTypes from "../constants/aiTypes.js";

export default class AI {
    constructor(id, x, y, sid) {
        let data = aiTypes[id];

        this.name = data.name;
        this.x = x;
        this.y = y;
        this.sid = sid;
        this.id = id; // AI type refrence (no know spell :()

        this.turnSpeed = data.turnSpeed;
        this.isHostile = data.isHostile;
        this.dmg = data.dmg;
        this.scale = data.scale;
        this.src = data.src;

        this.health = this.maxHealth = data.health;

        this.xVel = 0;
        this.yVel = 0

        this.targetDir = 0;
        this.dir = 0;

        this.isAI = true;
    }

    update(delta) {
        // 
    }
}