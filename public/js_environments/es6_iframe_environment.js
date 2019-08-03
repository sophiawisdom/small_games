export const canvas = document.getElementById("main")
const canvasContext = canvas.getContext("2d")
export default canvasContext


let time = 0
var calls = []
setTimeout(async () => {
    var game = await import(game_path)
    console.log("Game module is", game)
    if (game.update) {
        setInterval(() => {
            /*if (time % 180 === 0) {
              console.log("Clearing canvas");
              canvasContext.clearRect(10000, 10000, 10000, 10000);
            }*/
            let now = new Date()
            calls.push(now)
            calls = calls.filter(s => (now-s) < 5000)
            console.log(`${calls.length} calls in the last 5 seconds`)
            game.update(time++/60)
          }, 1000/60)
    } else {
        console.log("Unable to find game.update")
    }
}, 0)
