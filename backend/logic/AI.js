import UTILS from "../constants/utils.js";
import aiTypes from "../constants/aiTypes.js";
import Packets from "../constants/Packets.js";
import config from "../constants/config.js";

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
        this.speed = data.speed;
        this.scale = data.scale;
        this.src = data.src;
        this.xp = data.xp;
        this.onlyWater = data.onlyWater;

        this.health = this.maxHealth = data.health;

        this.xVel = 0;
        this.yVel = 0

        this.targetDir = 0;
        this.dir = 0;

        this.isAI = true;
        this.isAlive = true;

        this.deathTimer = 0;

        this.normalMovementTimer = 0;
        this.waitCount = 0;
        this.speedBoostTimer = 0;
    }

    changeHealth(value, doer) {
        this.health += value;

        if (this.health > this.maxHealth) {
            value -= (this.health - this.maxHealth);
            this.health = this.maxHealth;
        }

        if (value < 0) {
            this.targetDir = UTILS.getDirection(this, doer);
            this.speedBoostTimer = UTILS.randInt(4e3, 12e3);
        }

        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
            this.speedBoostTimer = 0;
            this.deathTimer = UTILS.randInt(2500, 7500);
        }

        if (doer) {
            if (!this.isAlive) {
                doer.addXP(this.xp);
            }

            doer.send(Packets.SERVER_TO_CLIENT.SHOW_TEXT, this.x, this.y, Math.ceil(value));
        }
    }

    update(delta, gameObjects) {
        if (!this.isAlive) {
            this.deathTimer -= delta;

            if (this.deathTimer <= 0) {
                this.deathTimer = 0;
                this.isAlive = true;

                this.health = this.maxHealth;
                this.x = UTILS.randInt(0, config.mapScale);
                this.y = UTILS.randInt(0, config.mapScale);
            }

            return;
        }

        if (this.speedBoostTimer <= 0) {
            this.normalMovementTimer -= delta;
            if (this.normalMovementTimer <= 0) {
                this.normalMovementTimer = UTILS.randInt(7500, 15e3);
                this.targetDir = UTILS.randFloat(-Math.PI, Math.PI);
    
                if (Math.random() < .25) {
                    this.waitCount = UTILS.randInt(2500, 7500);
                }
            }
        }

        let onIce = false;

        if (this.waitCount > 0 && this.speedBoostTimer <= 0) {
            this.waitCount -= delta;
            this.xVel = 0;
            this.yVel = 0;
        } else {
            if (this.dir != this.targetDir) {
                this.dir %= (Math.PI * 2);
    
                let netAngle = (this.dir - this.targetDir + (Math.PI * 2)) % (Math.PI * 2);
                let amnt = Math.min(Math.abs(netAngle - (Math.PI * 2)), netAngle, this.turnSpeed * delta);
                let sign = (netAngle - Math.PI) >= 0 ? 1 : -1;
    
                this.dir += sign * amnt + (Math.PI * 2);
            }
    
            this.dir %= (Math.PI * 2);

            let xVel = Math.cos(this.dir);
            let yVel = Math.sin(this.dir)
            let length = Math.sqrt(xVel * xVel + yVel * yVel);
            let spdMlt = 1;
    
            if (this.y <= config.snowBiomeEndY) {
                spdMlt *= .75; // 25% speed decrease when on snow
            }
    
            for (let i = 0; i < gameObjects.length; i++) {
                let tmpObj = gameObjects[i];
    
                if (tmpObj && (tmpObj.name == "lava pond" || tmpObj.name == "pond") && tmpObj.active) {
                    if (UTILS.getDistance(tmpObj, this) <= this.scale + tmpObj.scale) {
                        if (tmpObj.name == "pond" && tmpObj.y + tmpObj.scale <= config.snowBiomeEndY) {
                            onIce = true;
                        } else {
                            spdMlt *= (tmpObj.name == "lava pond" ? .35 : .55);
                            break;
                        }
                    }
                }
            }
    
            if (length != 0) {
                xVel /= length;
                yVel /= length;
            }

            if (this.speedBoostTimer > 0) {
                spdMlt *= 5.5;

                this.speedBoostTimer -= delta;
                if (this.speedBoostTimer <= 0) this.speedBoostTimer = 0;
            }
    
            if (xVel) this.xVel += xVel * this.speed * spdMlt * delta;
            if (yVel) this.yVel += yVel * this.speed * spdMlt * delta;
        }

        let tmpSpeed = UTILS.getDistance({ x: 0, y: 0 }, { x: this.xVel * delta, y: this.yVel * delta });
        let depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
        let tMlt = 1 / depth;

        for (let i = 0; i < depth; i++) {
            if (this.xVel) this.x += (this.xVel * delta) * tMlt;
            if (this.yVel) this.y += (this.yVel * delta) * tMlt;
        }

        if (this.xVel) {
            this.xVel *= Math.pow(onIce ? config.icePlayerDecel : config.playerDecel, delta);
            if (this.xVel <= 0.01 && this.xVel >= -0.01) this.xVel = 0;
        }

        if (this.yVel) {
            this.yVel *= Math.pow(onIce ? config.icePlayerDecel : config.playerDecel, delta);
            if (this.yVel <= 0.01 && this.yVel >= -0.01) this.yVel = 0;
        }

        if (this.x - this.scale < 0) {
            this.x = this.scale;
        } else if (this.x + this.scale > config.mapScale) {
            this.x = config.mapScale - this.scale;
        }

        if (this.y - this.scale < 0) {
            this.y = this.scale;
        } else if (this.y + this.scale > config.mapScale) {
            this.y = config.mapScale - this.scale;
        }
    }
}