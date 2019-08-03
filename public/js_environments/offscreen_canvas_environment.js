const canvas = document.getElementById("main")
const offscreen = canvas.transferControlToOffscreen()
const worker = new Worker(game_path)
worker.postMessage({ canvas: offscreen }, [offscreen])
