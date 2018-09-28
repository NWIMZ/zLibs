const COLORS = {
    'notStart': '#1FB5FF', // 未开始
    'running': '#FFAF25', // 进行中
    'completed': '#2EBC12' // 已完成
};
const noop = function () {};
class FlowChart {
    /**
     * 绘制一个流程图
     * @param {HTMLElement} el 
     * @param {} opts 
     */
    constructor(el, {
        getContent,
        clickHandle
    } = {}) {
        this.el = el;
        this.getContent = getContent || noop;
        this.clickHandle = clickHandle || noop;
        this.dataList = []; // 存储数据
        // TODO:
        this.render([{
            title: '未开始',
            status: 'notStart',
        }, {
            title: '进行中',
            contents: '22222',
            status: 'running',
        }, {
            title: '已完成',
            contents: '333',
            status: 'completed'
        }]);
        this.mainWrap = this.el.querySelector('.z-fc-main-wrap');
        this.addItem({title:'已完成',contents: '1'});

        this.bindEvent();
    }

    render(dataList) {
        this.dataList = dataList;
        let html = dataList.reduce((accu, curr) => {
            curr.color = COLORS[curr.status];
            return `${accu}${this.getItemHTML(curr)}`;
        }, '');
        this.el.innerHTML = `
        <div class="z-fc-container clearfix">
            <div class="z-fc-vline"></div>
            <ul class="z-fc-main-wrap">
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
            <span class="z-fc-point pull-left" style="background-color: ${color};"></span>
            <div class="clearfix pull-left z-fc-bubble">
                <div class="z-fc-triangle pull-left"></div>
                <div class="z-fc-contents pull-left">
                    <h4 style="color: ${color};">${title}<div class="z-fc-right-arrow"></div></h4>
                    <p>${contents}</p>
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
        $(this.mainWrap).on('click','h4',(event) => {
            let index = $(event.target).parents('li').eq(0).index();
            this.clickHandle(this.dataList[index],index);
        });
    }
}

// 添加css
(function () {
    if (document.getElementById('flowChartStyle')) {
        return;
    }
    let oStyle = document.createElement('style');
    oStyle.id = 'flowChartStyle';
    oStyle.innerText = `
    /* 整个模块的最外层容器 */
    .z-fc-container {
        margin-top: 6px;
        /*  */
        position: relative;
    }
    /* 左侧的灰色柱子 */
    .z-fc-vline {
        width: 4px;
        background-color: #D9DEE2;
        position: absolute;
        /* TODO: */
        top: 0;
        bottom: 36px;
        /* XXX:fix左侧的灰色柱子长度 */
        left: 6px;
    }
    /* 主体容器 */
    .z-fc-main-wrap {
        float: left;
        position: relative;
        z-index: 1;
    }

    /* 每条流程 */
    .z-fc-main-wrap>li {
        margin-bottom: 22px;
        /* 16 + 6 */
    }
    /*  */
    .z-fc-main-wrap>li:last-child {
        margin-bottom: 0px;
        height: 50px;
        /* XXX:fix左侧的灰色柱子长度 */
    }
    
    /* 左侧柱子上的点 */
    .z-fc-point {
        width: 12px;
        height: 12px;
        border: 2px solid #fff;
        border-radius: 50%;
        display: block;
    }

    /* 气泡 */
    .z-fc-bubble {
        margin-left: 10px;
        margin-top: -6px;
    }

    /* 带阴影的三角形 */
    .z-fc-triangle:before {
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
    .z-fc-triangle:after{
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
    .z-fc-contents {
        border-radius: 4px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
        padding: 8px;
        background: #fff;
    }
    /* 标题 */
    .z-fc-contents h4 {
        font-weight: normal;
        font-size: 16px;
        cursor: pointer;
    }
    /* 箭头 */
    .z-fc-right-arrow {
        display: inline-block;
        border-top: 2px solid;
        border-right: 2px solid;
        width: 6px;
        height: 6px;
        transform: rotate(45deg);
        position: relative;
        top: -1px;
        margin-left: 4px;
    }
    /* 内容 */
    .z-fc-contents p {
        font-size: 14px;
        color: #777;
    }
    /* 内容里的黑字 */
    .z-fc-contents p span {
        color: #000;
    }
    `;
    document.body.appendChild(oStyle);
})();