import canvasContext, { canvas } from "/js_environments/es6_iframe_environment.js"

export function update(t) {
    canvas.width |= 0
    canvasContext.fillStyle = "red";
    for (let i = 1001; i > 0; i--) {
        const Y = Math.sin(i/159)
        const xCoord = 900 + 500*i*Math.sin(Y*Math.sin(t/20)*20*Math.sin(t))/900
        const yCoord = 900 - 800*Math.pow(Y, 2)
        canvasContext.lineTo(xCoord, yCoord)
    }
    canvasContext.fill()
}
