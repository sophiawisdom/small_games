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

let t = 0
setTimeout(() => {
    // Attempt to provide compatibility with both Arkist API and with the loaded javascript setting up its own handlers.
    console.log("setTimeout is running - window.u is", window.u)
    if (window.u && typeof(window.u) === "function") {
        setInterval(() => window.u(t++/60), 1000/60)
    }
}, 0) // Run once the javascript in the iframe has ran
