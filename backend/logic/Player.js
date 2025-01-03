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
        this.isStealth = false;

        this.regenTimer = 0;
        this.regenRate = config.playerRegenerationRate;
        this.regenPower = config.playerRegenerationPower;

        this.meleeReload = 0;
        this.handAnimations = [0, 0];

        this.chatMsg = "";
        this.chatTimer = 0;

        this.totalXP = 0;

        this.itemReload = {};
        this.items = [];

        this.dragonDot = {
            ticks: 0,
            timer: 0
        };
        this.lockMove = false;
        this.upgradePoints = 0;
        this.upgradeAge = 2;

        this.stealthTimer = 0;
        this.regenerationTimer = 0;
        this.kamikaze = {
            timer: 0,
            ticks: 0
        };

        this.fortify = {
            health: 0,
            timer: 0,
            maxHealth: 0
        };

        this.skinRot = 0;
    }

    setName(name) {
        this.name = name || `combatant ${this.sid + 1}`;
        this.name = this.name.slice(0, 15);
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
        this.itemReload = {};
        this.items = [];

        this.isAlive = true;
        this.stealthTimer = 0;
        this.kamikaze = {
            timer: 0,
            ticks: 0
        };

        this.health = this.maxHealth = config.playerInitHealth;
        this.scale = 35;

        this.age = 1;
        this.XP = 0;
        this.maxXP = 300;
        this.totalXP = 0;

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
        this.upgradePoints = 0;

        this.regenTimer = 0;
        this.regenRate = config.playerRegenerationRate;
        this.regenPower = config.playerRegenerationPower;
        this.regenerationTimer = 0;
        this.lockMove = false;

        this.dragonDot = {
            ticks: 0,
            timer: 0
        };

        this.fortify = {
            health: 0,
            timer: 0,
            maxHealth: 0
        };

        this.upgradeAge = 2;

        if (this.ws) {
            this.addXP(0);
            this.changeHealth(0);
        }
    }

    addXP(xp) {
        let leveledUp = false;

        this.XP += xp;
        this.totalXP += xp;

        while (this.XP >= this.maxXP) {
            this.XP -= this.maxXP;
            this.age++;
            this.maxXP = Math.min(1e3, this.maxXP + 50);
            this.upgradePoints++;

            leveledUp = true;
        }

        if (leveledUp) {
            this.changeHealth(this.maxHealth);
            this.send(Packets.SERVER_TO_CLIENT.UPDATE_AGE, this.age);
            this.send(Packets.SERVER_TO_CLIENT.UPDATE_UPGRADES, this.upgradeAge, this.upgradePoints);
        }

        this.send(Packets.SERVER_TO_CLIENT.UPDATE_XP, this.XP, this.maxXP);
    }

    changeHealth(value, doer) {
        this.health += value;

        if (this.health > this.maxHealth) {
            value -= (this.health - this.maxHealth);
            this.health = this.maxHealth;
        }

        if (value < 0 && this.fortify.timer) {
            this.fortify.health += value;

            if (this.fortify.health <= 0) {
                this.maxHealth -= this.fortify.maxHealth;
            }
        }

        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
            this.send(Packets.SERVER_TO_CLIENT.KILL_PLAYER);
        }

        if (doer && !doer.isAI) {
            if (!this.isAlive) {
                doer.addXP(150 * this.age);
            }

            doer.send(Packets.SERVER_TO_CLIENT.SHOW_TEXT, this.x, this.y, Math.ceil(value));
        }

        this.send(Packets.SERVER_TO_CLIENT.UPDATE_HEALTH, this.health, this.maxHealth);
        if (value) this.send(Packets.SERVER_TO_CLIENT.SHOW_TEXT, this.x, this.y, Math.ceil(value), !doer);
    }

    attack(players, ais) {
        let tmp = {
            x: this.x + Math.cos(this.dir) * this.scale * 1.8,
            y: this.y + Math.sin(this.dir) * this.scale * 1.8
        };

        for (let i = 0; i < players.length + ais.length; i++) {
            let tmpObj = players[i] || ais[i - players.length];

            if (tmpObj.isAlive && UTILS.getDistance(tmpObj, tmp) <= 26 + tmpObj.scale) { // 17 = hand scale
                tmpObj.changeHealth(-15 * this.attackMlt, this);

                let tmpDir = UTILS.getDirection(tmpObj, this);

                if (tmpObj.isAI) tmpObj.waitTimer = 0;

                tmpObj.xVel += Math.cos(tmpDir) * (tmpObj.isAI && tmpObj.isHostile ? .55 : .35);
                tmpObj.yVel += Math.sin(tmpDir) * (tmpObj.isAI && tmpObj.isHostile ? .55 : .35);
            }
        }
    }

    update(delta, players, gameObjects) {
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
            this.regenTimer = this.regenRate * (this.regenerationTimer ? 0.05 : 1);
            this.changeHealth(this.regenPower);
        }

        if (this.dragonDot.ticks > 0) {
            this.dragonDot.timer -= delta;

            if (this.dragonDot.timer <= 0) {
                this.changeHealth(-1);
                this.dragonDot.ticks--;
                this.dragonDot.timer = 1e3;
            }
        }

        if (!this.isAlive) return;

        for (let i = 0; i < this.items.length; i++) {
            if (this.itemReload[this.items[i]]) {
                this.itemReload[this.items[i]] -= delta;
                if (this.itemReload[this.items[i]] <= 0) this.itemReload[this.items[i]] = 0;
            }
        }

        this.stealthTimer -= delta;
        if (this.stealthTimer <= 0) this.stealthTimer = 0;

        this.regenerationTimer -= delta;
        if (this.regenerationTimer <= 0) this.regenerationTimer = 0;

        if (this.fortify.timer > 0) {
            this.fortify.timer -= delta;

            if (this.fortify.timer <= 0) {
                this.fortify.timer = 0;
                this.health -= this.fortify.health;
                this.maxHealth -= this.fortify.maxHealth;
            }
        }

        if (this.kamikaze.ticks > 0) {
            this.kamikaze.timer -= delta;

            if (this.kamikaze.timer <= 0) {
                this.kamikaze.timer = 1e3;
                this.kamikaze.ticks--;
                this.changeHealth(-15);

                if (this.kamikaze.ticks <= 0) {
                    this.attackMlt -= .35;
                    this.speed -= config.kamikazeSpeed;
                }
            }
        }

        this.meleeReload -= delta;
        if (this.meleeReload <= 0) this.meleeReload = 0;

        let onIce = false;

        if (this.lockMove || this.regenerationTimer) {
            this.xVel = 0;
            this.yVel = 0;
        } else {
            let xVel = this.moveDir != undefined ? Math.cos(this.moveDir) : 0;
            let yVel = this.moveDir != undefined ? Math.sin(this.moveDir) : 0;
            let length = Math.sqrt(xVel * xVel + yVel * yVel);
            let spdMlt = 1;
            let onWater = false;
            let onLand = false;

            if (this.y <= config.snowBiomeEndY && this.x > 3e3 && this.x < config.mapScale - 3e3) { // NOT IN OCEAN
                spdMlt *= .75; // 25% speed decrease when on snow
            }

            for (let i = 0; i < gameObjects.length; i++) {
                let tmpObj = gameObjects[i];

                if (tmpObj && (tmpObj.name == "land" || tmpObj.name == "lava pond" || tmpObj.name == "pond") && tmpObj.active) {
                    if (UTILS.getDistance(tmpObj, this) <= this.scale + tmpObj.scale) {
                        if (tmpObj.name == "land") {
                            onLand = true;
                            break;
                        } else if (tmpObj.name == "pond" && tmpObj.y + tmpObj.scale <= config.snowBiomeEndY) {
                            onIce = true;
                        } else {
                            if (tmpObj.name == "lava pond") {
                                spdMlt *= .35;
                            } else {
                                if (this.y >= config.mapScale - 2e3) {
                                    continue;
                                } else {
                                    onWater = true;
                                }
                            }

                            break;
                        }
                    }
                }
            }

            if (!onLand && this.x > 2600 && this.x < config.mapScale - 2600) {
                if (this.y >= 3625 && this.y <= 4325) {
                    spdMlt *= .65;
                    this.xVel -= config.riverSpeed * delta;
                } else if (this.y >= 7625 && this.y <= 8325) {
                    spdMlt *= .65;
                    this.xVel += config.riverSpeed * delta;
                }
            }

            if (!onLand && (onWater || this.x <= 3e3 || this.x >= config.mapScale - 3e3)) {
                spdMlt *= .55;
            }

            if (length != 0) {
                xVel /= length;
                yVel /= length;
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

        let tmpIndx = players.indexOf(this);
        for (let i = tmpIndx + 1; i < players.length; i++) {
            let other = players[i];

            if (other != this && other.isAlive) {
                let tmpInt = UTILS.getDistance(this, other) - (this.scale + other.scale);
                tmpInt = (tmpInt * -1) / 2;

                let tmpDir = UTILS.getDirection(this, other);

                this.x += (tmpInt * Math.cos(tmpDir));
                this.y += (tmpInt * Math.sin(tmpDir));
                other.x -= (tmpInt * Math.cos(tmpDir));
                other.y -= (tmpInt * Math.sin(tmpDir));
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