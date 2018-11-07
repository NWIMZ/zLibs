/**
 * @Author: Z 
 * @Date: 2018-07-20 14:45:04 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-07 14:40:29
 * @description canvas画百分比圆环
 */
function drawRing(element,pct,opts){
    
    let width = element.offsetWidth;
    let height = element.offsetHeight;

    let oCanvas = document.createElement('canvas');
    oCanvas.width = oCanvas.height = width = height = Math.min(width, height);
    
    const defalutOpts = {
        // 圆环底色
        backColor: '#D8E0E6',
        // 圆环颜色
        frontColor: '#5C9DED',
        // 圆环半径
        radius: Math.min(width,height) / 3,
    };
    opts = Object.assign(defalutOpts,opts);
    const {radius,backColor,frontColor} = opts;
    
    if(width == undefined || height == undefined){
        throw new Error('canvas 没有设置宽度或高度');
    }

    const centerX = width / 2;
    const centerY = height / 2;
    

    let ctx = oCanvas.getContext("2d");
    // 坐标轴移动到中心
    ctx.translate(centerX, centerY);

    // 背景环
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineCap="round";
    ctx.strokeStyle = backColor;
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    // ctx.fillStyle = backColor;
    // ctx.fill();
    ctx.stroke();

    // 填充环
    ctx.beginPath();
    // 旋转90度
    ctx.rotate(-90 * Math.PI / 180);
    ctx.strokeStyle = frontColor;
    ctx.arc(0, 0, radius, 0, 2 * Math.PI * pct);
    ctx.stroke();

    element.appendChild(oCanvas);

}

// Test:
let oC = document.createElement('div');

document.body.appendChild(oC);
drawRing(oC, 0.9, {
    // radius: 200,
});