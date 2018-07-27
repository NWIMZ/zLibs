/*
 * @Author: Z 
 * @Date: 2018-07-09 15:23:49 
 * @Last Modified by: Z
 * @Last Modified time: 2018-07-09 15:30:22
 */
function Dashboard(el,opts){
    var canvas = document.createElement('canvas');
    el.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    drawCirl(ctx);
}