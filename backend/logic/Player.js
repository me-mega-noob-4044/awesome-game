import UTILS from "../constants/utils.js";
import config from "../constants/config.js";

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

        this.moveDir = undefined;

        this.dt = 0;
    }

    setName(name) {
        this.name = name || "unknown";
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
    }

    update(delta) {
        if (!this.isAlive) return;

        let xVel = this.moveDir != undefined ? Math.cos(this.moveDir) : 0;
        let yVel = this.moveDir != undefined ? Math.sin(this.moveDir) : 0;
        let length = Math.sqrt(xVel * xVel + yVel * yVel);
        let spdMlt = 1;

        if (this.y <= config.snowBiomeEndY) {
            spdMlt = .75; // 25% speed decrease when on snow
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
        }

        if (this.xVel) {
            this.xVel *= Math.pow(config.playerDecel, delta);
            if (this.xVel <= 0.01 && this.xVel >= -0.01) this.xVel = 0;
        }

        if (this.yVel) {
            this.yVel *= Math.pow(config.playerDecel, delta);
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