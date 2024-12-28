export default function renderCircle(mainContext, scale, dontFill, dontStroke) {
    mainContext.beginPath();
    mainContext.arc(0, 0, scale, 0, Math.PI * 2);
    if (!dontFill) mainContext.fill();
    if (!dontStroke) mainContext.stroke();
}