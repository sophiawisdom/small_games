let animationWorker = null;
self.onmessage = function(e) {
    console.log("Received message:", e)
    /*
  switch (e.data.msg) {
    case 'start':
      if (!animationWorker) {
        importScripts(e.data.origin + '/animation.js');
        animationWorker = new Animation(e.data.canvas.getContext('2d'));
      }
      animationWorker.start();
      break;
    case 'stop':
      animationWorker.stop();
      break;
  }
  */
}

/*
function update(t) {
    canvas.width |= 0
    canvasContext.fillStyle = "red";
    for (let i = 1001; i > 0; i--) {
        const Y = Math.sin(i/159)
        const xCoord = 900 + 500*i*Math.sin(Y*Math.sin(t/20)*20*Math.sin(t))/900
        const yCoord = 900 - 800*Math.pow(Y, 2)
        canvasContext.lineTo(xCoord, yCoord)
    }
    canvasContext.fill()
}

let time = 0;
setTimeout(() => update(time++/60), 1000/60)
*/
