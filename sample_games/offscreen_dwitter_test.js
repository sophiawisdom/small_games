let animationWorker = null;
var canvas, canvasContext;
var time = 0;

var calls = []

self.onmessage = function(e) {
  canvas = e.data.canvas
  canvasContext = canvas.getContext("2d")
  console.log("Created canvas", canvas, "and context", canvasContext)
  setInterval(() => {
    if (time % 180 === 0) {
      console.log("Clearing canvas");
      canvasContext.clearRect(0, 0, 2000, 2000);
    }
    let now = new Date()
    calls.push(now)
    calls = calls.filter(s => (now-s) < 5000)
    console.log(`${calls.length} calls in the last 5 seconds`)
    update(time++/60)
  }, 1000/60)
}

function update(t) {
  canvasContext.fillStyle = "red";
  for (let i = 1001; i > 0; i--) {
      const Y = Math.sin(i/159)
      const xCoord = 900 + 500*i*Math.sin(Y*Math.sin(t/20)*20*Math.sin(t))/900
      const yCoord = 900 - 800*Math.pow(Y, 2)
      canvasContext.lineTo(xCoord, yCoord)
  }
  canvasContext.fill()
}

