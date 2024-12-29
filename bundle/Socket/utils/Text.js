export default class Text {
    constructor(x, y, value, color) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.color = color;
        this.duration = 1e3;
        this.active = true;
    }
    
    render(mainContext, delta) {
        this.duration -= delta;

        mainContext.fillStyle = this.color;
        mainContext.strokeStyle = "rgba(0, 0, 0, .5)";
		mainContext.font = "36px Roboto";
        mainContext.lineWidth = 7;
        mainContext.strokeText(this.value, 0, 0);
        mainContext.fillText(this.value, 0, 0);

        if (this.duration <= 0) {
            this.active = false;
        }
    }
}