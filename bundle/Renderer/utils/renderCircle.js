export default function renderCircle(x, y, mainContext, scale, dontFill, dontStroke) {
    mainContext.beginPath();
    mainContext.arc(x, y, scale, 0, Math.PI * 2);
    if (!dontFill) mainContext.fill();
    if (!dontStroke) mainContext.stroke();
}