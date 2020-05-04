let config = [
  {
    default: 1000,
    description: "Origin on x-axis",
    key: "x_base"
  },
  {
    default: 500,
    description: "Origin on y-axis",
    key: "y_base"
  },
  {
    default: 100,
    description: "First multiplier",
    key: "first_mult"
  },
  {
    default: 400,
    description: "Second multiplier",
    key: "second_mult"
  },
  {
    default: 6,
    description: "Number of blocks",
    key: "iterations"
  },
  {
    default: 50,
    description: "Size of blocks",
    key: "size"
  },
  {
    default: 255,
    description: "Color",
    key: "color",
    max: 255,
    min: 0
  }
]

function update(t) {
  context.fillStyle=R(Math.sin(t)*variables.color, Math.cos(t)*variables.color , variables.color)
    
  for(let i=0; i < variables.iterations; i++) {
    const x_sin = (Math.sin(t)*variables.first_mult);
    const x_cos = Math.cos(t+i)*variables.second_mult;
    const x = variables.x_base + x_sin + x_cos;
    
    const y_sin = Math.sin(t+i)*variables.second_mult;
    const y_cos = Math.cos(t)*variables.first_mult;
    const y = variables.y_base + y_cos + y_sin
    context.fillRect(x,y,variables.size,variables.size)
  }
}