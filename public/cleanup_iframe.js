let t = 0
setTimeout(() => {
    // Attempt to provide compatibility with both Arkist API and with the loaded javascript setting up its own handlers.
    console.log("setTimeout is running - window.u is", window.u)
    if (window.u && typeof(window.u) === "function") {
        setInterval(() => window.u(t++), 16)
    }
}, 0) // Run once the javascript in the iframe has ran