/* 
 * canvas画百分比圆环
 * @Author: Z 
 * @Date: 2018-07-20 14:45:04 
 * @Last Modified by: Z
 * @Last Modified time: 2018-07-20 14:49:27
 */
function draw(c,pct,opts){
    // canvas的宽高
    let width = c.width;
    let height = c.height;

    const centerX = width / 2;
    const centerY = height / 2;
    
    const defalutOpts = {
        bgColor: '#D8E0E6',
        fColor: '#5C9DED'
    };
    opts = Object.assign(defalutOpts,opts);
    const {radius,bgColor,fColor} = opts;

    var ctx = c.getContext("2d");
    // 坐标轴移动到中心
    ctx.translate(centerX, centerY);

    // 背景
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineCap="round";
    ctx.strokeStyle = bgColor;
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    // ctx.fillStyle = bgColor;
    // ctx.fill();
    ctx.stroke();

    // 填充
    ctx.beginPath();
    // 旋转90度
    ctx.rotate(-90 * Math.PI / 180);
    ctx.strokeStyle = fColor;
    ctx.arc(0, 0, radius, 0, 2 * Math.PI * pct);
    ctx.stroke();
}