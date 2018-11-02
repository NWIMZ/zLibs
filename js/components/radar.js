function drawRadar(element, {
    color = 'rgba(31,181,255,0.5)',
    circleNum = 4,
    lineNum = 4,
} = {}) {
    element.style.position = 'relative';
    let width = element.offsetWidth;
    let height = element.offsetHeight;
    width = height = Math.min(width, height);

    let oCanvas = document.createElement('canvas');
    oCanvas.width = oCanvas.height = width;

    element.innerHTML = `<div class="radar-scanner" style="width:${width}px;height: ${height}px"></div>`
    element.append(oCanvas);


    let radius = width / 2;
    let ctx = oCanvas.getContext('2d');
    ctx.translate(width / 2, height / 2);

    // 画圆形
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    for (let i = circleNum; i > 0; i--) {
        ctx.arc(0, 0, radius * i / circleNum, 0, 2 * Math.PI);
        ctx.stroke();
    }


    ctx.save();
    // 画线
    for (let i = 0; i <= lineNum; i++) {
        ctx.beginPath();
        ctx.moveTo(-radius, 0);
        ctx.lineTo(radius, 0);
        ctx.stroke();
        ctx.rotate(Math.PI / lineNum);
    }
}

// 添加css
(function () {
    if (document.getElementById('radarStyle')) {
        return;
    }
    let oStyle = document.createElement('style');
    oStyle.id = 'radarStyle';
    oStyle.innerText = `
    .radar-scanner {
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
    }
    
    .radar-scanner:after {
        content: "";
        display: block;
        /* background-image: conic-gradient(rgba(0,0,0, 0), rgba(1,134,241,0.6)); */
        background: url("./09.png") no-repeat;
        background-size: contain;
        width: 50%;
        height: 50%;
        position: absolute;
        top: 0;
        left: 50%;
        animation: radar-scanner-beam 5s infinite;
        animation-timing-function: linear;
        transform-origin: bottom left;
    }
    @keyframes radar-scanner-beam {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    `;
    document.head.appendChild(oStyle);
})();

var oDiv = document.createElement('div');
oDiv.style.width = '400px';
oDiv.style.height = '400px';
document.body.append(oDiv);

drawRadar(oDiv);