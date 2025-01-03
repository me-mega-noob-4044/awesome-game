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
        this.volcanoAi = data.volcanoAi;
        this.avoidObjects = data.avoidObjects;
        this.aggroDistance = data.aggroDistance;
        this.onlyLand = data.onlyLand;
        this.freeXP = data.freeXP;

        this.health = this.maxHealth = data.health;

        this.xVel = 0;
        this.yVel = 0

        this.layer = data.layer || 0;

        this.targetDir = 0;
        this.dir = 0;

        this.isAI = true;
        this.isAlive = true;

        this.deathTimer = 0;

        this.normalMovementTimer = 0;
        this.waitCount = 0;
        this.speedBoostTimer = 0;

        this.targetTimer = 0;
        this.target;

        this.ripAndTearTimer = 0;
        this.ripAndTeatDotTimer = 0;
        this.volcanoTimer = 0;

        this.players = [];
    }

    changeHealth(value, doer) {
        this.health += value;

        if (this.health > this.maxHealth) {
            value -= (this.health - this.maxHealth);
            this.health = this.maxHealth;
        }

        if (value < 0 && !this.isHostile) {
            if (!doer) {
                for (let i = 0; i < this.players.length; i++) {
                    let tmpPlayer = this.players[i];

                    if (!tmpPlayer.canSee(this)) continue;

                    tmpPlayer.send(Packets.SERVER_TO_CLIENT.SHOW_TEXT, this.x, this.y, Math.ceil(value), true);
                }
            } else if (!doer.stealthTimer) {
                if (this.freeXP) {
                    doer.addXP(3);
                }
    
                this.targetDir = UTILS.getDirection(this, doer);
                this.speedBoostTimer = UTILS.randInt(4e3, 12e3);
            }
        }

        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
            this.speedBoostTimer = 0;
            this.deathTimer = UTILS.randInt(2500, 7500);

            if (this.target) {
                this.target.lockMove = false;
                this.target = null;
                this.targetTimer = 0;
                this.ripAndTearTimer = 0;
            }
        }

        if (doer) {
            if (!this.isAlive) {
                doer.addXP(this.xp);
            }

            doer.send(Packets.SERVER_TO_CLIENT.SHOW_TEXT, this.x, this.y, Math.ceil(value));
        }
    }

    update(delta, players, gameObjects) {
        this.players = players;

        if (this.volcanoTimer > 0) {
            this.volcanoTimer -= delta;

            if (this.volcanoTimer <= 0) {
                this.volcanoTimer = 0;
                this.changeHealth(UTILS.getDistance({ x: config.mapScale / 2, y: config.mapScale / 2 }, this) <= 250 ? -15 : this.inLavaPond ? -7.5 : -5);
            }
        }

        this.inLavaPond = false;

        if (!this.isAlive) {
            this.deathTimer -= delta;

            if (this.deathTimer <= 0) {
                this.deathTimer = 0;
                this.isAlive = true;

                this.health = this.maxHealth;
                this.x = UTILS.randInt(3e3, config.mapScale - 3e3);
                this.y = UTILS.randInt(0, config.mapScale);
            }

            return;
        }

        if (this.speedBoostTimer <= 0) {
            this.normalMovementTimer -= delta;

            if (this.normalMovementTimer <= 0) {
                this.normalMovementTimer = UTILS.randInt(5e3, 7500);
                this.targetDir = UTILS.randFloat(-Math.PI, Math.PI);
    
                if (Math.random() < .25) {
                    this.waitCount = UTILS.randInt(2500, 7500);

                    if (this.isHostile) this.waitCount /= 2;
                }
            }
        }

        this.aiDamageTick = !this.aiDamageTick;

        if (this.aggroDistance) {
            if (this.target && this.target.stealthTimer) {
                this.target.lockMove = false;

                this.target = null;
                this.ripAndTearTimer = 0;
                this.targetTimer = 0;
            }

            if (this.target) {
                if (this.ripAndTearTimer > 0) {
                    this.targetDir = Math.PI * Math.sin((performance.now() / 500) % (2 * Math.PI));
                    // 2 * Math.PI * Math.random();
                    // this.dir + Math.PI / 2;

                    this.ripAndTearTimer -= delta;
                    if (this.ripAndTearTimer <= 0) {
                        this.target.xVel = Math.cos(this.dir) * 3.5;
                        this.target.yVel = Math.sin(this.dir) * 3.5;
                        this.target.changeHealth(-this.dmg * 2, this);

                        this.target.lockMove = false;
                        this.target.dragonDot.ticks = 6;
                        this.ripAndTearTimer = 0;
                    } else {
                        this.target.lockMove = true;
                    }

                    this.target.x = this.x + Math.cos(this.dir) * this.scale;
                    this.target.y = this.y + Math.sin(this.dir) * this.scale;

                    if (!this.target.isAlive) {
                        this.target.lockMove = false;

                        this.target = null;
                        this.ripAndTearTimer = 0;
                        this.targetTimer = 0;
                    }
                } else {
                    this.targetDir = UTILS.getDirection(this.target, this);

                    this.targetTimer -= delta;

                    if (UTILS.getDistance(this.target, this) <= this.scale + this.target.scale) {
                        if (this.volcanoAi && Math.random() < .2) {
                            this.ripAndTearTimer = UTILS.randInt(2e3, 6e3);
                        } else {
                            if (this.aiDamageTick || this.volcanoAi) {
                                this.target.changeHealth(-this.dmg, this);
                                this.target.xVel += Math.cos(this.targetDir) * (this.volcanoAi ? .75 : .4);
                                this.target.yVel += Math.sin(this.targetDir) * (this.volcanoAi ? .75 : .4);    
                            }
                        }
                    }
    
                    if (this.targetTimer <= 0 || !this.target.isAlive) {
                        this.target = null;
                        this.targetTimer = 0;
                    }
                }
            } else {
                let filteredPlayers = players.filter(e => e.isAlive && !e.stealthTimer && UTILS.getDistance(e, this) <= this.aggroDistance);

                if (filteredPlayers.length) {
                    this.target = filteredPlayers.sort((a, b) => UTILS.getDistance(a, this) - UTILS.getDistance(b, this))[0];
                    this.targetTimer = UTILS.randInt(15e3, 20e3);
                }
            }
        }

        let onIce = false;
        let onLand = false;
        let inRiver = false;

        if (!this.avoidObjects && this.x > 2600 && this.x < config.mapScale - 2600) {
            this.waitCount = 0;

            if (this.y >= 3625 && this.y <= 4325) {
                inRiver = true;
                this.xVel -= config.riverSpeed * delta;
            } else if (this.y >= 7625 && this.y <= 8325) {
                inRiver = true;
                this.xVel += config.riverSpeed * delta;
            }
        }

        if (this.waitCount > 0 && this.speedBoostTimer <= 0) {
            this.waitCount -= delta;
            this.xVel = 0;
            this.yVel = 0;
        } else {
            let turnSpeed = this.turnSpeed;

            if (this.ripAndTearTimer > 0) {
                turnSpeed *= 5.5;

                this.ripAndTeatDotTimer -= delta;
                if (this.ripAndTeatDotTimer <= 0) {
                    this.target.changeHealth(-this.dmg * .5, this);
                    this.ripAndTeatDotTimer = 1e3;
                }
            }

            if (this.dir != this.targetDir) {
                this.dir %= (Math.PI * 2);
    
                let netAngle = (this.dir - this.targetDir + (Math.PI * 2)) % (Math.PI * 2);
                let amnt = Math.min(Math.abs(netAngle - (Math.PI * 2)), netAngle, turnSpeed * delta);
                let sign = (netAngle - Math.PI) >= 0 ? 1 : -1;
    
                this.dir += sign * amnt + (Math.PI * 2);
            }
    
            this.dir %= (Math.PI * 2);

            let xVel = Math.cos(this.dir);
            let yVel = Math.sin(this.dir)
            let length = Math.sqrt(xVel * xVel + yVel * yVel);
            let spdMlt = 1;
            let onWater = false;
    
            if (this.y <= config.snowBiomeEndY) {
                spdMlt *= .75; // 25% speed decrease when on snow
            }
    
            if (!this.avoidObjects) {
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
                                    spdMlt += .35;
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
            }
    
            if (length != 0) {
                xVel /= length;
                yVel /= length;
            }

            if (this.speedBoostTimer > 0) {
                spdMlt *= 3.2;

                this.speedBoostTimer -= delta;
                if (this.speedBoostTimer <= 0) this.speedBoostTimer = 0;
            }

            if (!onLand && this.x > 2600 && this.x < config.mapScale - 2600) {
                if (this.y >= 3625 && this.y <= 4325) {
                    spdMlt *= .85;
                } else if (this.y >= 7625 && this.y <= 8325) {
                    spdMlt *= .85;
                }
            }

            if (!onLand && (onWater || this.x <= 3e3 || this.x >= config.mapScale - 3e3)) {
                spdMlt *= .55;
            }

            if (this.target) {
                spdMlt *= 1.55; // Mobs with target will run towards it
            }
    
            if (this.ripAndTearTimer <= 0) {
                if (xVel) this.xVel += xVel * this.speed * spdMlt * delta;
                if (yVel) this.yVel += yVel * this.speed * spdMlt * delta;
            }
        }

        let tmpSpeed = UTILS.getDistance({ x: 0, y: 0 }, { x: this.xVel * delta, y: this.yVel * delta });
        let depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
        let tMlt = 1 / depth;

        for (let i = 0; i < depth; i++) {
            if (this.xVel) this.x += (this.xVel * delta) * tMlt;
            if (this.yVel) this.y += (this.yVel * delta) * tMlt;

            if (!this.volcanoAi) {
                for (let t = 0; t < gameObjects.length; t++) {
                    let tmpObj = gameObjects[t];
    
                    if (tmpObj && tmpObj.active && ((this.onlyWater && tmpObj.name == "land") || tmpObj.name == "lava pond" || tmpObj.name == "volcano")) {
                        let tmpDir = UTILS.getDirection(this, tmpObj);
                        let tmpScale = this.scale + (tmpObj.name == "volcano" ? 200 : tmpObj.scale);
    
                        if (tmpObj.name != "land" && this.volcanoTimer == 0 && UTILS.getDistance(tmpObj, this) <= tmpObj.scale) {
                            if (tmpObj.name == "lava pond") {
                                this.volcanoTimer = 1;
                                this.inLavaPond = true;
                            } else {
                                this.volcanoTimer = UTILS.getDistance(tmpObj, this) <= 250 ? 100 : UTILS.getDistance(tmpObj, this) <= tmpObj.scale * .75 ? 250 : 500;
                            }
                        }
    
                        if ((tmpObj.name == "land" || tmpObj.name == "volcano") && UTILS.getDistance(tmpObj, this) <= tmpScale) {
                            this.x = tmpObj.x + (tmpScale * Math.cos(tmpDir));
                            this.y = tmpObj.y + (tmpScale * Math.sin(tmpDir));
                            this.xVel *= 0.75;
                            this.yVel *= 0.75;
                        }
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

        if (this.onlyWater) {
            if (this.x - this.scale < 0) {
                this.x = this.scale;
            } else if (this.x + this.scale > config.mapScale) {
                this.x = config.mapScale - this.scale;
            } else if (!inRiver && this.x + this.scale > 3e3 && this.x - this.scale < config.mapScale - 3e3) {
                if (this.x < config.mapScale / 2) {
                    this.x = 3e3 - this.scale;
                } else {
                    this.x = (config.mapScale - 3e3) + this.scale;
                }
            }
        } else {
            if (this.x - this.scale < (this.onlyLand ? 2450 : 0)) {
                this.x = this.scale + (this.onlyLand ? 2450 : 0);
            } else if (this.x + this.scale > config.mapScale - (this.onlyLand ? 2450 : 0)) {
                this.x = config.mapScale - this.scale - (this.onlyLand ? 2450 : 0);
            }
        }

        if (this.y - this.scale < 0) {
            this.y = this.scale;
        } else if (this.y + this.scale > config.mapScale) {
            this.y = config.mapScale - this.scale;
        }

        if (this.volcanoAi) {
            let tmp = {
                x: config.mapScale / 2,
                y: config.mapScale / 2
            };

            let dir = UTILS.getDirection(this, tmp);
            let tmpScale = 1200;

            if (UTILS.getDistance(tmp, this) > tmpScale) {
                this.x = tmp.x + Math.cos(dir) * tmpScale;
                this.y = tmp.y + Math.sin(dir) * tmpScale;
                this.xVel *= .75;
                this.yVel *= .75;
            }
        }
    }
}