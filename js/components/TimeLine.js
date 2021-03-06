/**
 * 流程图
 * @Author: Z 
 * @Date: 2018-09-27 14:48:25 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-08 16:55:40
 */
const COLORS = {
    'notStart': '#1FB5FF', // 未开始
    'running': '#FFAF25', // 进行中
    'completed': '#2EBC12' // 已完成
};
// 空函数
const noop = function () {};
class TimeLine {
    /**
     * 
     * @param {HTMLElement} el 
     * @param {} opts 
     */
    constructor(el, {
        getContent,
        clickHandle,
        dataList = []
    } = {}) {
        this.el = el;
        this.getContent = getContent || noop;
        this.clickHandle = clickHandle || noop;
        this.dataList = []; // 存储数据
        this.render(dataList);
        this.mainWrap = this.el.querySelector('.z-tl-main-wrap');
        this.bindEvent();
    }

    /**
     * 
     * @param {*} dataList [{title,contents,status}]
     */
    render(dataList) {
        this.dataList = dataList;
        let html = dataList.reduce((accu, curr) => {
            curr.color = COLORS[curr.status];
            return `${accu}${this.getItemHTML(curr)}`;
        }, '');
        this.el.innerHTML = `
        <div class="z-tl-container clearfix">
            <ul class="z-tl-main-wrap">
                ${html}
            </ul>
        </div>`;
    }

    /**
     * 增加条目
     * @param {Object} item 同getItemHTML的参数
     */
    addItem(item) {
        this.dataList.push(item);
        this.mainWrap.innerHTML += this.getItemHTML(item);
    }
    getItemHTML({
        title = '',
        contents = '',
        color = COLORS.notStart
    }) {
        if (!title && !contents) {
            return '';
        }
        return `<li class="clearfix">
            <div class="z-tl-line"></div>
            <span class="z-tl-point pull-left" style="background-color: ${color};"></span>
            <div class="clearfix pull-left z-tl-bubble">
                <div class="z-tl-triangle pull-left"></div>
                <div class="z-tl-contents pull-left">
                    <h4 style="color: ${color};">${title}<div class="z-tl-right-arrow"></div></h4>
                    <div>${contents}</div>
                </div>
            </div>
        </li>`;
    }
    bindEvent(){
        // this.mainWrap.addEventListener('click',function(event){
        //     if(event.target.tagName.toUpperCase() == 'H4'){

        //     }
        // });
        // XXX:去调jQuery
        // $(this.mainWrap).on('click','h4',(event) => {
        //     let index = $(event.target).parents('li').eq(0).index();
        //     this.clickHandle(this.dataList[index],index);
        // });
    }
}

// 添加css
(function () {
    if (document.getElementById('timeLineStyle')) {
        return;
    }
    let oStyle = document.createElement('style');
    oStyle.id = 'timeLineStyle';
    oStyle.innerText = `
    /* 整个模块的最外层容器 */
    .z-tl-container {
        margin-top: 6px;
        /*  */
        position: relative;
    }
    /* 主体容器 */
    .z-tl-main-wrap {
        float: left;
        position: relative;
        z-index: 1;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    /* 每条流程 */
    .z-tl-main-wrap>li {
        position: relative;
        /* 16 + 6 */
    }
    /* 左侧的灰色柱子 */
    .z-tl-line{
        position: absolute;
        width: 4px;
        height: 100%;
        background-color: #D9DEE2;
        left: 6px;
        z-index: -1;
    }
    /* XXX:fix左侧的灰色柱子长度 */
    .z-tl-main-wrap>li:last-child .z-tl-line{
        height: 0px;
    }
    
    /* 左侧柱子上的点 */
    .z-tl-point {
        width: 12px;
        height: 12px;
        border: 2px solid #fff;
        box-sizing: content-box;
        border-radius: 50%;
        display: block;
    }

    /* 气泡 */
    .z-tl-bubble {
        margin-left: 10px;
        margin-top: -6px;
        margin-bottom: 22px;/* 16 + 6 */
        max-width: calc(100% - 26px);
    }
    .z-tl-main-wrap>li:last-child .z-tl-bubble{
        margin-bottom: 0px;
    }

    /* 带阴影的三角形 */
    .z-tl-triangle:before {
        display: block;
        content: '';
        width: 0;
        height: 0;
        border-right: 10px solid #fff;
        margin-right: -1px;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        margin-top: 10px;
        position: relative;
        z-index: 1;
    }
    .z-tl-triangle:after{
        display: block;
        content: '';
        width: 0;
        height: 0;
        border-right: 10px solid rgba(0, 0, 0, 0.2);
        margin-right: -1px;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        margin-top: -8px;
        position: absolute;
        z-index: -1;
        filter: blur(2px);
    }

    /* 单条流程 */
    .z-tl-contents {
        border-radius: 4px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
        padding: 8px;
        background: #fff;
        max-width: calc(100% - 9px);
    }
    /* 标题 */
    .z-tl-contents h4 {
        font-weight: normal;
        font-size: 16px;
        cursor: pointer;
        margin: 0;
    }
    /* 箭头 */
    .z-tl-right-arrow {
        display: inline-block;
        /* 颜色继承自父元素的color */
        border-top: 2px solid;
        border-right: 2px solid;
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
        position: relative;
        top: -1px;
        margin-left: 4px;
    }
    /* 内容 */
    .z-tl-contents p {
        font-size: 14px;
        color: #777;
        margin: 0;
        padding: 0;
        margin-top: 10px;
    }
    `;
    document.head.appendChild(oStyle);
})();


// Test:
let oWrap = document.createElement('div');
let tl = new TimeLine(oWrap,{
    dataList : [{
    title: '未开始',
    status: 'notStart',
}, {
    title: '进行中',
    contents: '22221111111112',
    status: 'running',
}, {
    title: '已完成',
    contents: '333',
    status: 'completed'
}]
});
document.body.append(oWrap);