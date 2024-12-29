export default class GameObject {
    constructor(x, y, sid, id, data) {
        this.sid = sid;
        this.id = id;
        this.x = x;
        this.y = y;

        this.name = data.name;
        this.scale = data.scale;

        this.sentTo = {};
        this.active = true;
    }
}