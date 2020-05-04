
{% autoescape false %}
let config = {{config}}
{% endautoescape %}

function update(t) {
    {{stolen_dwitter_code}}
}



c.width = 1920;
for(let item=20; item--; item > 0) {
    for(let width=9; width--; width > 0) {
        for(let height=8; height--; height > 0) {
            const x_param = 120+item+ width*200 /*spacing between columns*/ + Math.sin(t/width+Math.sin(item+t*2))*50;
            const y_param = 120-width+ height*120 /*spacing between rows*/ + Math.cos(t/height+Math.cos(item-height*5))*40;
            x.fillRect(x_param,y_param, 10 /* width */, 10 /* height */)
        }
    }
}
