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

        this.x = UTILS.randInt(0, config.mapScale);
        this.y = UTILS.randInt(0, config.mapScale);

        this.dir = 0;
        this.sentTo = {};
        this.scale = 35;
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

    spawn() {
        this.isAlive = true;

        this.health = this.maxHealth = config.playerInitHealth;
        this.scale = 35;

        this.age = 1;
        this.XP = 0;
        this.maxXP = 300;
    }
}