export const canvas = document.getElementById("main")
const canvasContext = canvas.getContext("2d")
export default canvasContext


let t = 0
setTimeout(async () => {
    var game = await import(game_path)
    console.log("Game module is", game)
    if (game.update) {
        setInterval(() => game.update(t++/60, 1000/60))
    } else {
        console.log("Unable to find game.update")
    }
}, 0)
