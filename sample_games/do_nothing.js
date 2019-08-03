import canvasContext from "/js_environments/es6_iframe_environment.js"

setInterval(() => {
    console.log("The interval loop is still going!")
}, 1000)

/*
setInterval(() => {
    console.log("React user is running")
    canvasContext.fillStyle = "red"
    canvasContext.fillRect(0, 0, 500, 500)
    while(1) {}
}, 10000)

canvasContext.fillStyle = "green"
canvasContext.fillRect(0, 0, 500, 500)

console.log("10 seconds until cpu melts")
*/
