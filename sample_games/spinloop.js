let animationWorker = null;
var canvas, canvasContext;
var time = 0;

const R = (r, g, b, a) => `rgba(${r|0}, ${g|0}, ${b|0}, ${a === undefined ? 1 : a|0})`

self.onmessage = function(e) {
    canvas = e.data.canvas
    canvasContext = canvas.getContext("2d")
    while(1) {
        if ((time++ % 100000000) === 0) {
            console.log(time)
        }
    }
  }
