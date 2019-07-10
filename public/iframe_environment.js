export const canvas = document.getElementById("main")
const canvasContext = canvas.getContext("2d")
export default canvasContext

// Emulate Arkist/Dwitter API
window.S = Math.sin
window.C = Math.cos
window.T = Math.tan
window.R = (r, g, b, a) => `rgba(${r|0}, ${g|0}, ${b|0}, ${a === undefined ? 1 : a|0})`
window.c = canvas
window.x = canvasContext
