let canvas, context;
let time = 0;
let pause = false;
let initted = false;

const S = Math.sin
const C = Math.cos
const T = Math.tan
const R = (r, g, b, a) => `rgba(${r|0}, ${g|0}, ${b|0}, ${a === undefined ? 1 : a|0})`

var variables = {};

self.onmessage = function(e) {
    if (!initted) {
        if (e.data.type != "init") {
            throw new Error("First message must be init");
        }

        if (self.config) {
            config.forEach(value=> {
                variables[value.key] = value.default;
            })
        } else {
            self.config = []
        }
        initCanvas(e.data.canvas);
        postMessage(config);
        initted = true;
        return;
    }

    switch (e.data.type) {
        case "set_variables":
            variables = e.data.vars;
            break;
        case "clear":
            context.clearRect(0, 0, canvas.width, canvas.height);
            time = 0;
            break;
        case "pause":
            pause = !pause;
            break;
        default:
            throw new Error(`Unknown message type ${type}`);
    }
}
  
const initCanvas = cv => {
    c = cv;
    canvas = cv;
    x = cv.getContext("2d");
    context = x;
    setInterval(() => {
        if (!pause) {
        update(time++/60)
        }
    }, 1000/60);
}
