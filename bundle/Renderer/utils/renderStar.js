export default function renderStar(mainContext, spikes, outer, inner) {
    let rot = Math.PI / 2 * 3;
    let x, y;
    let step = Math.PI / spikes;

    mainContext.beginPath();
    if (!navigator.platform.includes("Mac")) mainContext.moveTo(0, -outer);

    for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outer;
        y = Math.sin(rot) * outer;
        mainContext.lineTo(x, y);
        rot += step;
        x = Math.cos(rot) * inner;
        y = Math.sin(rot) * inner;
        mainContext.lineTo(x, y);
        rot += step;
    }

    if (!navigator.platform.includes("Mac")) mainContext.lineTo(0, -outer);
    mainContext.closePath();
}