import canvasContext, { canvasElem } from "/src/iframe_environment.js"

var enabled = false

canvasContext.fillStyle = "green"

var lastClickX = 0
var lastClickY = 0

canvasElem.addEventListener("mousedown", e => {
    enabled = true
    lastClickX = e.pageX
    lastClickY = e.pageY
})

canvasElem.addEventListener("mouseup", () => {
    enabled = false
    canvasContext.clearRect(0, 0, canvasElem.width, canvasElem.height)
})

canvasElem.addEventListener("mousemove", e => {
    if (!enabled) return
    let dist = (lastClickX - e.pageX) ** 2 + (lastClickY - e.pageY) ** 2
    canvasContext.fillRect(e.pageX, e.pageY, dist/100, dist/100)
})
