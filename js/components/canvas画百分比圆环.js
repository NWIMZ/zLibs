/**
 * canvas画百分比圆环
 * @Author: Z 
 * @Date: 2018-07-20 14:45:04 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-05 15:47:33
 */
function draw(c,pct,opts){
    // canvas的宽高
    let width = c.width;
    let height = c.height;
    
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
    
    
    

    var ctx = c.getContext("2d");
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
}

// Test:
let oC = document.createElement('canvas');
oC.width = 500;
oC.height = 500;

document.body.appendChild(oC);
draw(oC, 0.9, {
    // radius: 200,
});