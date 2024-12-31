import UTILS from "../constants/utils.js";
import config from "../constants/config.js";
import Packets from "../constants/Packets.js";

var playerSIDS = 0;

export default class Player {
    constructor(ws, id, sid) {
        this.ws = ws;

        if (!ws) {
            this.id = id;
            this.sid = sid;
        } else {
            this.id = UTILS.randString(7);
            this.sid = playerSIDS++;
        }

        this.x = UTILS.randInt(35, config.mapScale - 35);
        this.y = UTILS.randInt(35, config.mapScale - 35);

        this.dir = 0;
        this.sentTo = {};
        this.scale = 35;

        this.xVel = 0;
        this.yVel = 0;
        this.speed = config.playerSpeed;

        this.attackMlt = 1;

        this.moveDir = undefined;

        this.dt = 0;
        this.kills = 0;

        this.volcanoTimer = 0;

        this.regenTimer = 0;
        this.regenRate = config.playerRegenerationRate;
        this.regenPower = config.playerRegenerationPower;

        this.meleeReload = 0;
        this.handAnimations = [0, 0];

        this.chatMsg = "";
        this.chatTimer = 0;
    }

    setName(name) {
        this.name = name || `retard #${this.sid}`;
    }

    send(type, ...args) {
        if (this.ws) {
            this.ws.send(UTILS.encodeMessage(type, ...args));
        }
    }

    canSee(other) {
        if (!other) return false;

        let dx = Math.abs(other.x - this.x) - other.scale;
        let dy = Math.abs(other.y - this.y) - other.scale;

        return dx <= (config.maxScreenWidth / 2) * 1.3 && dy <= (config.maxScreenHeight / 2) * 1.3;
    }

    getData() {
        return [
            this.id,
            this.sid,
            this.name,
            this.x,
            this.y
        ];
    }

    setData(data) {
        this.id = data[0];
        this.sid = data[1];
        this.name = data[2];
        this.x = data[3];
        this.y = data[4];
    }

    spawn() {
        this.isAlive = true;

        this.health = this.maxHealth = config.playerInitHealth;
        this.scale = 35;

        this.age = 1;
        this.XP = 0;
        this.maxXP = 300;

        this.x = UTILS.randInt(35, config.mapScale - 35);
        this.y = UTILS.randInt(35, config.mapScale - 35);

        this.xVel = 0;
        this.yVel = 0;
        this.speed = config.playerSpeed;

        this.attackMlt = 1;

        this.moveDir = undefined;

        this.dt = 0;
        this.kills = 0;

        this.volcanoTimer = 0;

        this.regenTimer = 0;
        this.regenRate = config.playerRegenerationRate;
        this.regenPower = config.playerRegenerationPower;

        if (this.ws) {
            this.addXP(0);
            this.changeHealth(0);
        }
    }

    addXP(xp) {
        this.XP += xp;

        if (this.XP >= this.maxXP) {
            this.age++;
            this.XP = 0;
            this.maxXP += 150;

            this.changeHealth(this.maxHealth);
        }

        this.send(Packets.SERVER_TO_CLIENT.UPDATE_XP, this.XP, this.maxXP);
    }

    changeHealth(value, doer) {
        this.health += value;

        if (this.health > this.maxHealth) {
            value -= (this.health - this.maxHealth);
            this.health = this.maxHealth;
        }

        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
            this.send(Packets.SERVER_TO_CLIENT.KILL_PLAYER);
        }

        if (doer) {
            if (!this.isAlive) {
                doer.addXP(150 * this.age);
            }

            doer.send(Packets.SERVER_TO_CLIENT.SHOW_TEXT, this.x, this.y, Math.ceil(value));
        }

        this.send(Packets.SERVER_TO_CLIENT.UPDATE_HEALTH, this.health, this.maxHealth);
        if (value) this.send(Packets.SERVER_TO_CLIENT.SHOW_TEXT, this.x, this.y, Math.ceil(value), !doer);
    }

    attack(players) {
        let tmp = {
            x: this.x + Math.cos(this.dir) * this.scale * 1.8,
            y: this.y + Math.sin(this.dir) * this.scale * 1.8
        };

        for (let i = 0; i < players.length; i++) {
            let tmpObj = players[i];

            if (tmpObj.isAlive && UTILS.getDistance(tmpObj, tmp) <= 26 + tmpObj.scale) { // 17 = hand scale
                tmpObj.changeHealth(-15 * this.attackMlt, this);

                let tmpDir = UTILS.getDirection(tmpObj, this);
                tmpObj.xVel += Math.cos(tmpDir) * .7;
                tmpObj.yVel += Math.sin(tmpDir) * .7;
            }
        }
    }

    update(delta, gameObjects) {
        if (!this.isAlive) return;

        if (this.volcanoTimer > 0) {
            this.volcanoTimer -= delta;

            if (this.volcanoTimer <= 0) {
                this.volcanoTimer = 0;
                this.changeHealth(UTILS.getDistance({ x: config.mapScale / 2, y: config.mapScale / 2 }, this) <= 250 ? -15 : this.inLavaPond ? -7.5 : -5);
            }
        }

        this.inLavaPond = false;

        this.regenTimer -= delta;
        if (this.regenTimer <= 0) {
            this.regenTimer = this.regenRate;
            this.changeHealth(this.regenPower);
        }

        if (!this.isAlive) return;

        this.meleeReload -= delta;
        if (this.meleeReload <= 0) this.meleeReload = 0;

        let xVel = this.moveDir != undefined ? Math.cos(this.moveDir) : 0;
        let yVel = this.moveDir != undefined ? Math.sin(this.moveDir) : 0;
        let length = Math.sqrt(xVel * xVel + yVel * yVel);
        let spdMlt = 1;
        let onIce = false;

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

        if (xVel) this.xVel += xVel * this.speed * spdMlt * delta;
        if (yVel) this.yVel += yVel * this.speed * spdMlt * delta;

        let tmpSpeed = UTILS.getDistance({ x: 0, y: 0 }, { x: this.xVel * delta, y: this.yVel * delta });
        let depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
        let tMlt = 1 / depth;

        for (let i = 0; i < depth; i++) {
            if (this.xVel) this.x += (this.xVel * delta) * tMlt;
            if (this.yVel) this.y += (this.yVel * delta) * tMlt;

            for (let t = 0; t < gameObjects.length; t++) {
                let tmpObj = gameObjects[t];

                if (tmpObj && tmpObj.active && (tmpObj.name == "lava pond" || tmpObj.name == "volcano")) {
                    let tmpDir = UTILS.getDirection(this, tmpObj);
                    let tmpScale = this.scale + 200;

                    if (this.volcanoTimer == 0 && UTILS.getDistance(tmpObj, this) <= tmpObj.scale) {
                        if (tmpObj.name == "lava pond") {
                            this.volcanoTimer = 1;
                            this.inLavaPond = true;
                        } else {
                            this.volcanoTimer = UTILS.getDistance(tmpObj, this) <= 250 ? 100 : UTILS.getDistance(tmpObj, this) <= tmpObj.scale * .75 ? 250 : 500;
                        }
                    }

                    if (tmpObj.name == "volcano" && UTILS.getDistance(tmpObj, this) <= tmpScale) {
                        this.x = tmpObj.x + (tmpScale * Math.cos(tmpDir));
                        this.y = tmpObj.y + (tmpScale * Math.sin(tmpDir));
                        this.xVel *= 0.75;
                        this.yVel *= 0.75;
                    }
                }
            }
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