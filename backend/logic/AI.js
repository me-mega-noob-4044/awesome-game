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

export default class AI {
    constructor(data, x, y, sid) {
        this.name = data.name;
        this.x = x;
        this.y = y;
        this.sid = sid;

        this.turnSpeed = data.turnSpeed;
        this.isHostile = data.isHostile;
        this.dmg = data.dmg;
        this.scale = data.scale;

        this.health = this.maxHealth = data.health;

        this.xVel = 0;
        this.yVel = 0

        this.targetDir = 0;
        this.dir = 0;
    }

    update(delta) {
        // 
    }
}