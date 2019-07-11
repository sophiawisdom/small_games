function u(t) {
    c.width |= 0
    x.fillStyle = "red";
    for (let i = 1001; i > 0; i--) {
        Y = S(i/159)
        const xCoord = 900 + 500*(i)*S(Y*S(t/20)*20*S(t))/900
        const yCoord = 900 - 800*Math.pow(Y, 2)
        x.lineTo(xCoord, yCoord)
    }
    x.fill()
}
