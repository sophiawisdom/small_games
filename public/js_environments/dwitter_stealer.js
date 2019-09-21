let animationWorker = null;
var canvas, canvasContext, c, x;
var time = 0;

const S = Math.sin
const C = Math.cos
const T = Math.tan
const R = (r, g, b, a) => `rgba(${r|0}, ${g|0}, ${b|0}, ${a === undefined ? 1 : a|0})`


self.onmessage = function(e) {
  canvas = e.data.canvas
  c = canvas
  canvasContext = canvas.getContext("2d")
  x = canvasContext
  setInterval(() => {
    update(time++/60)
  }, 1000/60)
}

function update(t) {
    {{stolen_dwitter_code}}
}
