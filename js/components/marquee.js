/**
 * 文字横向滚动
 * @Author: Z 
 * @Date: 2018-07-30 09:41:41 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-05 15:48:09
 * @param {HTMLElement} oWrap 目标元素 
 * @param {Array} textList 通知文字数组 ['first','second']
 * @param {Number} speed 滚动速度 移动1px所用毫秒数
 * @param {Number} space 多个通知间的间隔字数
 */
function creatLED(oWrap,textList,{speed=50,space=6}={}){
    // 创建元素
    let oBegin = document.createElement('div');
    oBegin.innerHTML = textList.reduce((prev,cuur) => {
        return `${prev}<span style="padding-right: ${space}em;">${cuur}</span>`;
    },'');
    oBegin.style.display = 'inline';
    let oEnd = oBegin.cloneNode(true);
    oWrap.appendChild(oBegin);
    oWrap.appendChild(oEnd);

    // 设置样式
    oWrap.style.overflow = 'hidden';
    oWrap.style.whiteSpace = 'nowrap';

    // 文字滚动
    let marquee = function(){
        if(oEnd.offsetWidth - oWrap.scrollLeft <=0){
            oWrap.scrollLeft -= oBegin.offsetWidth;
        }else{
            oWrap.scrollLeft++;
        }
    };
    
    // 间歇调用
    setInterval(marquee,speed);
}