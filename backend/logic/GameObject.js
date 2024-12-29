export default class GameObject {
    constructor(x, y, sid, id, data) {
        this.sid = sid;
        this.id = id;
        this.x = x;
        this.y = y;

        this.layer = typeof data.layer == "object" ? [ ...data.layer ] : data.layer;

        this.name = data.name;
        this.scale = data.scale;

        this.sentTo = {};
        this.active = true;

        this.waterPadding = 0;
        this.waterMult = 1;
        this.waterPlus = 0;
    }
}