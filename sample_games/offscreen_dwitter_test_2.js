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
    canvas.width=1920
    for(i=50;i > 0;i--) {
        for(j=20;j--;) {
            canvasContext.fillRect(900+S(C(t+j)+i)*(100*S(t)+S(t+j)*100), 500+C(S(t+j)+i)*(200+S(t+j)*100), 10, 10)
        }
    }
}
