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
with(x)for(q=j=64;j--;fillStyle=R(q,j*3,q-i*q),fill(stroke()))for(beginPath(i=5);i--;)arc(960+S(m=i*11+t)*400,340+C(m)*200+j*5,(j&64)*q,0,7)
}
