
/**
 * 文字横向滚动
 * @param {HTMLElement} oWrap 目标元素 
 * @param {Array} textList 通知文字数组 ['first','second']
 * @param {Number} speed 滚动速度 移动1px所用毫秒数
 * @param {Number} space 多个通知间的间隔字数
 */
function creatLED(oWrap,textList,{speed=50,space=6}={}){
    var timeId;
    // 创建元素
    var oBegin = document.createElement('div');
    oBegin.innerHTML = textList.reduce((prev,cuur) => {
        return `${prev}<span style="padding-right: ${space}em;">${cuur}</span>`;
    },'');
    oBegin.style.display = 'inline';
    var oEnd = oBegin.cloneNode(true);
    oWrap.appendChild(oBegin);
    oWrap.appendChild(oEnd);

    // 设置样式
    oWrap.style.overflow = 'hidden';
    oWrap.style.whiteSpace = 'nowrap';

    // 文字滚动
    var marquee = function(){
        if(oEnd.offsetWidth - oWrap.scrollLeft <=0){
            oWrap.scrollLeft -= oBegin.offsetWidth;
        }else{
            oWrap.scrollLeft++;
        }
    };
    
    // 间歇调用
    clearInterval(timeId);
    timeId = setInterval(marquee,speed);
}