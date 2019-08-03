let animationWorker = null;
var canvas, canvasContext;
var time = 0;

self.onmessage = function(e) {
  canvas = e.data.canvas
  canvasContext = canvas.getContext("2d")
  console.log("Created canvas", canvas, "and context", canvasContext)
  setInterval(() => {
    update(time++/60)
  }, 1000/60)
}

function update(t) {
  canvas.width |= 0;
  canvasContext.fillStyle = "red";
  for (let i = 1001; i > 0; i--) {
      const Y = Math.sin(i/159)
      const xCoord = 900 + 500*i*Math.sin(Y*Math.sin(t/20)*20*Math.sin(t))/900
      const yCoord = 900 - 800*Math.pow(Y, 2)
      canvasContext.lineTo(xCoord, yCoord)
  }
  canvasContext.fill()
}

