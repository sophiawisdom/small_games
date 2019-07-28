// Emulate Arkist/Dwitter API
window.S = Math.sin
window.C = Math.cos
window.T = Math.tan
window.R = (r, g, b, a) => `rgba(${r|0}, ${g|0}, ${b|0}, ${a === undefined ? 1 : a|0})`
window.c = document.getElementById("main")
window.x = c.getContext("2d")

let t = 0
setTimeout(() => {
    // Attempt to provide compatibility with both Arkist API and with the loaded javascript setting up its own handlers.
    console.log("setTimeout is running - window.u is", window.u)
    if (window.u && typeof(window.u) === "function") {
        setInterval(() => window.u(t++/60), 1000/60)
    }
}, 0) // Run once the javascript in the iframe has ran
