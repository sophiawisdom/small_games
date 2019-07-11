 import canvasContext, { canvas } from "/iframe_environment.js"

var enabled = false

canvasContext.fillStyle = "green"

var lastClickX = 0
var lastClickY = 0

canvas.addEventListener("mousedown", e => {
    enabled = true
    lastClickX = e.pageX
    lastClickY = e.pageY
})

canvas.addEventListener("mouseup", () => {
    enabled = false
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
})

canvas.addEventListener("mousemove", e => {
    if (!enabled) return
    let dist = (lastClickX - e.pageX) ** 2 + (lastClickY - e.pageY) ** 2
    canvasContext.fillRect(e.pageX, e.pageY, dist/100, dist/100)
})

console.log("test_game.js finished execution")
