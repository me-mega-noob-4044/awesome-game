import UTILS from "../constants/utils.js";
import config from "../constants/config.js";

var playerSIDS = 0;

export default class Player {
    constructor(ws) {
        this.ws = ws;

        this.sid = playerSIDS++;
        this.id = UTILS.randString(7);
    }

    setName(name) {
        this.name = name;
    }

    send(type, ...args) {
		if (this.ws) {
			this.ws.send(UTILS.encodeMessage(type, args));
		}
	}

    spawn() {
        this.isAlive = true;

        this.health = this.maxHealth = config.playerInitHealth;
        this.scale = 35;

        this.age = 1;
        this.XP = 0;
        this.maxXP = 300;
    }

    send() {}
}