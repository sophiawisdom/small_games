const offscreen = document.getElementById("main").transferControlToOffscreen()
const worker = new Worker(game_path)
worker.postMessage({ canvas: offscreen }, offscreen)
