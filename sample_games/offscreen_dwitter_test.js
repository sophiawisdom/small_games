let animationWorker = null;
var canvas, canvasContext;
var time = 0;

const R = (r, g, b, a) => `rgba(${r|0}, ${g|0}, ${b|0}, ${a === undefined ? 1 : a|0})`

self.onmessage = function(e) {
  canvas = e.data.canvas
  canvasContext = canvas.getContext("2d")
  setInterval(() => {
    update(time++/60)
  }, 1000/60)
}

function update(t) {
  canvasContext.fillStyle=R(Math.sin(t)*255,Math.cos(t)*255,255)
    
  for(var i=0;i<6;i++) {
    canvasContext.fillRect(1e3+(Math.sin(t)*100)+Math.cos(t+i)*400,500+(Math.cos(t)*100)+Math.sin(t+i)*400,50,50)
  }
}