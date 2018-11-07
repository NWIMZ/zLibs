/**
 * @Author: Z 
 * @Date: 2018-07-31 14:25:44 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-05 16:17:23
 */
class DashBoard {
    /**
     * 绘制一个仪表盘
     * @param {HTMLElement} wrap 容器
     * @param {Object} 配置项
     */
    constructor(wrap, {
        width = 400, // 容器宽度
        height = 400, // 容器高度
        scaleNum = 55, // 刻度数量
        areaNum = 5, // 分了几块
        // 圆弧角度范围
        angleRange = 270,
        legendArray = ['<0.8','0.8~1.6','1.6~3','3~5','>5'],
        // 渐变色
        gradientColorArray = ['#f05553', '#feb300', '#18e8db', '#008dfe', '#64c87e']
        // gradientColorArray = ['red', 'yellow', 'green', 'blue']

    } = {}) {
        this.width = width;
        this.height = height;
        this.scaleNum = scaleNum;
        this.areaNum = areaNum;
        this.gradientColorArray = gradientColorArray;
        this.legendArray = legendArray;

        this.radius = width / 2;

        this.scaleWidth = this.calcSize(10); // 单个刻度宽度
        this.scaleHeight = this.calcSize(22); // 单个刻度高度
        this.scaleSpaceing = this.calcSize(3); // 刻度间隔
        // 角度
        this.angleRange = angleRange;
        this.offsetAngle = (360 - angleRange) / 2;
        this.START_ANGLE = 90 + this.offsetAngle;
        this.END_ANGELE = 90 - this.offsetAngle;

        if(!wrap){
            throw new Error('wrap元素没找到,检查第一个参数是否为元素');
        }

        wrap.style.position = 'relative';

        let oCanvas = document.createElement('canvas');
        oCanvas.width = width;
        oCanvas.height = height;
        wrap.appendChild(oCanvas);
        this.ctx = oCanvas.getContext('2d');
        // 坐标轴移动到中心
        this.ctx.translate(this.width / 2, this.height / 2);

        this.draw();
        this.drawScale(wrap, this.radius);
        this.drawScaner(wrap,this.radius);
        // 写外层刻度文字
        this.drawLegend(wrap, this.radius);
    }

    /**
     * 
     * @param {Number|String} deg 指针角度.数字的话直接表示多少度,字符的话,表示等级
     */
    draw(deg=0) {
        let ctx = this.ctx;
        ctx.clearRect(-this.width/2,-this.height/2,this.width,this.height);
        
        // 保存初始状态
        ctx.save();

        // 最外层圆弧
        ctx.restore();
        ctx.save();
        this.drawArc(ctx, this.calcSize(180), 2);

        // 画内层圆弧(大)
        ctx.restore();
        ctx.save();
        this.drawArc(ctx, this.calcSize(140), 4);

        // 内层圆弧(中)
        ctx.restore();
        ctx.save();
        this.drawArc(ctx, this.calcSize(96), 0.5);

        // 内层圆弧(小)
        ctx.restore();
        ctx.save();
        this.drawArc(ctx, this.calcSize(37), 0.5);


        // 画斜线
        ctx.restore();
        ctx.save();
        this.drawDivideLine(ctx);

        // 画指针
        ctx.restore();
        ctx.save();
        this.drawPointer(ctx,deg);
    }


    /**
     * 画圆弧
     * @param {*} ctx canvas context
     * @param {Number} r 半径
     * @param {Number} lw 圆弧线宽
     */
    drawArc(ctx, r, lw) {
        
        ctx.beginPath();
        ctx.lineWidth = lw; // TODO:
        ctx.strokeStyle = 'rgba(1,134,241,0.5)';
        ctx.arc(0, 0, r, this.calcRadByDeg(this.START_ANGLE), this.calcRadByDeg(this.END_ANGELE));
        ctx.stroke();
    }

    /**
     * 划线
     */
    drawDivideLine(ctx) {
        let _step = this.calcRadByDeg(this.angleRange / this.areaNum);
        ctx.rotate(this.calcRadByDeg(this.offsetAngle));
        for (let i = 0; i <= this.areaNum; i++) {
            ctx.beginPath();
            ctx.lineWidth = 0.2;
            ctx.strokeStyle = 'rgba(1,134,241,0.5)';
            ctx.moveTo(0, 0);
            ctx.lineTo(0, this.calcSize(180));
            ctx.stroke();
            // 画顶部的短线
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(1,134,241)';
            ctx.lineWidth = 2;
            ctx.moveTo(-0.1, this.calcSize(132));
            ctx.lineTo(-0.1, this.calcSize(140));
            ctx.stroke();
            ctx.rotate(_step);
        }
    }

    /**
     * 画指针
     * @param {*} ctx 
     * @param {Number|String} deg 角度 
     */
    drawPointer(ctx, deg = 0) {
        if (typeof deg == 'string') {
            let stepAng = this.angleRange / this.areaNum;
            let arr = [];
            for (let i = 0; i < this.areaNum; i++) {
                arr.push(stepAng / 2 + stepAng * i);
            }
            deg = arr[deg-1] || deg;
        }
        // 画三角
        ctx.rotate(this.calcRadByDeg(this.START_ANGLE + deg));
        ctx.fillStyle = '#0186f1';
        ctx.moveTo(0, this.calcSize(10));
        ctx.lineTo(0, this.calcSize(-10));
        ctx.lineTo(this.calcSize(120), 0);
        ctx.fill();
        // 20 120 

        ctx.restore();
        ctx.save();

        // 外层淡蓝色圆
        ctx.fillStyle = '#8dccff';
        ctx.beginPath();
        ctx.arc(0, 0, this.calcSize(17), 0, this.calcRadByDeg(360));
        ctx.fill();

        // 白色
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(0, 0, this.calcSize(11), 0, this.calcRadByDeg(360));
        ctx.fill();

        // 内层蓝色圆
        ctx.fillStyle = '#0186f1';
        ctx.beginPath();
        ctx.arc(0, 0, this.calcSize(10), 0, this.calcRadByDeg(360));
        ctx.fill();



    }

    // 根据设计稿的尺寸按比例缩放
    calcSize(size) {
        return size * this.width / 400;
    }

    // 角度换算弧度
    calcRadByDeg(deg) {
        return Math.PI * deg / 180;
    }

    /**
     * 最外层文字标记,
     * XXX:由于有最小文字的原因,如果尺寸太小可能文字会重叠,还需改进
     */
    drawLegend(wrap, radius){
        let num = this.legendArray.length;
        let startAngle = 180 + 45 + this.angleRange / num / 2;
        let legendWrap = document.createElement('ul');
        legendWrap.innerHTML = this.legendArray.reduce((prev,curr,index) => {
            return `${prev}<span style="
            line-height: 1;
            font-size: ${this.calcSize(16)}px;
            color: rgba(1,134,241,0.5);
            position: absolute;
            left: ${radius}px;
            top: ${0}px;
            transform-origin: 0 ${radius}px;
            transform: rotate(${startAngle + index * this.angleRange / num}deg) translateX(-50%);
            ">${curr}</span>`;
        },'');

        wrap.appendChild(legendWrap);
        // let startAngle = this.START_ANGLE + (this.angleRange / num);
        // ctx.rotate(startAngle);
        // this.legendArray.forEach((item,index) => {
        //     ctx.beginPath();

        //     ctx.font = `${this.calcSize(12)}px`;
        //     ctx.fillStyle = 'rgba(1,134,241,0.5)';
        //     ctx.fillText(item,0,this.calcSize(190));
        //     ctx.rotate(this.angleRange / num);
        // });

    }
    

    // 画刻度
    drawScale(scaleWrap, radius) {
        let oUl = document.createElement('ul');
        oUl.className = 'clearfix scale-wrap';

        // 创建元素
        let html = '';
        for (let i = 0; i < this.scaleNum; i++) {
            html += `<li style="
                position: absolute;
                left: ${radius-this.scaleWidth/2}px;
                top: ${radius-this.calcSize(170)}px;
                width: ${this.scaleWidth}px;
                height: ${this.scaleHeight}px;
            "></li>`;
        }
        oUl.innerHTML = html;
        scaleWrap.appendChild(oUl);
        let aLi = oUl.getElementsByTagName('li');

        this.setScaleBackground(aLi);
        this.setScaleRotate(aLi);
    }
    /**
     * 设置背景颜色
     * @param {HTMLCollection} aLi
     */
    setScaleBackground(aLi) {
        let len = this.gradientColorArray.length;
        let linearGradient = this.gradientColorArray.map((color, index) => {
            let ptc = (index + 1) / len * 100 + '%';
            return color + ' ' + ptc;
        }).join(',');

        let backgroundImage = `linear-gradient(to right,${linearGradient})`;
        let backgroundSize = this.scaleNum * (this.scaleWidth + this.scaleSpaceing) - this.scaleSpaceing;
        Array.prototype.slice.call(aLi).forEach((li, index) => {
            li.style.backgroundImage = backgroundImage;
            li.style.backgroundSize = backgroundSize + 'px';
            li.style.backgroundPositionX = -index * (this.scaleWidth + this.scaleSpaceing) + 'px';
            li.style.backgroundRepeat = 'no-repeat';
            // li.style.background = 'rgba(0,0,0,0.5)';
        });
    }

    /**
     * 设置旋转
     * @param {HTMLCollection} aLi 
     */
    setScaleRotate(aLi) {
        let startAngle = 180 + this.offsetAngle;
        Array.prototype.slice.call(aLi).forEach((li, index) => {
            li.style.transformOrigin = `50% ${this.calcSize(170)}px`;

            let angleRange = this.angleRange + 5;// XXX:这个5有问题,每次需要调,暂时不知道怎么计算
            li.style.transform = `rotate(${startAngle + index * angleRange / this.scaleNum}deg)`;
        });
    }

    drawScaner(warp){
        let oScaner = document.createElement('div');

    }
}

// Test
var oWrap1 = document.createElement('div');
document.body.appendChild(oWrap1);
var defalutDashBoard = new DashBoard(oWrap1);
defalutDashBoard.draw(90);

// var oWrap2 = document.createElement('div');
// document.documentElement.appendChild(oWrap2);
// var configDashBoard = new DashBoard(oWrap2,{
//     gradientColorArray: ['red', 'blue'],
//     width: 300,
//     height: 300,
//     scaleNum: 30
// });
// configDashBoard.draw('1');