/*
 * @Author: Z 
 * @Date: 2018-07-16 15:09:39 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-07 15:10:23
 */
let THEME = [{
    borderColor: '#000000',
    backgroundColor: '#212223',
    labelColor: '#999999',
    valueColor: '#D3D3D3'
},{
    borderColor: '#9DA6AD',
    backgroundColor: '#FFFFFF',
    labelColor: '#555555',
    valueColor: '#222222'
    
}];

 /**
 * 
 * @param {Element} wrap 容器
 * @param {Array} dataList 数据
 * @param {Object} opts 配置项
 */
function renderBarChart(wrap, dataList, opts) {
    // 图例容器
    let legendWrap = document.createElement('div');
    legendWrap.className = 'legend-wrap clearfix';

    let {
        colorArray,
        legend
    } = opts;
    if (!colorArray) {
        colorArray = legend.map((item) => {
            return item.color;
        });
    }

    // 渲染图例
    let legendHtml = '';
    legend.forEach((item, index) => {
        legendHtml += `<div style="float: left;margin-left: 29px;">
        ${getLengedIconHTML(item.color)}
        ${item.text}
        </div>`;
    });
    legendWrap.innerHTML = `<div class="clearfix" style="float: right;">${legendHtml}</div>`;


    // 渲染主要区域
    let mainWrap = document.createElement('div');
    mainWrap.style.position = 'relative';
    // 进度条容器
    let progressBarWrap = document.createElement('ul');

    progressBarWrap.className = 'pgb-wrap';
    progressBarWrap.style.cssText = `flex-direction: column;display: flex;justify-content: space-around;`;

    let html = '';
    for (let item of dataList) {
        let pgb = new ProgressBar(null,{
            value: item.used,
            max: (item.used + item.rest),
            height: 10,
            progressColor: (item.color || colorArray[0]),
            backgroundColor: colorArray[1],
        });
        html += `<li>
                    <div style="margin-bottom: 3px;font-size: 14px;">
                        <span class="z-label" style="margin-right: 5px;color: ${THEME[1].labelColor};">${item.label}</span>
                        <span class="value" style="color: ${THEME[1].valueColor};font-weight: 600;">${item.val || item.used}</span>
                    </div>
                    <div class="sort-pgb-wrap">${pgb.getHTML()}</div>
                </li>`;
        pgb = null;
    }

    progressBarWrap.innerHTML = html;

    // 坐标轴容器
    let labelWrap = document.createElement('div');
    labelWrap.className = 'label-wrap clearfix';
    labelWrap.style.position = 'relative';
    labelWrap.style.marginTop = '3px';

    let labelHtml = '';
    let size = 5;
    for (let i = 0; i <= size; i++) {
        let val = i / size * 100 + '%';
        labelHtml += `<span style="position: absolute;left: ${val};transform: translateX(-50%);">${val}</span>`;
    }
    labelWrap.innerHTML = labelHtml;


    wrap.appendChild(legendWrap);

    mainWrap.appendChild(progressBarWrap);
    mainWrap.appendChild(labelWrap);
    wrap.appendChild(mainWrap);

    // addEvent(mainWrap, function (item,index) {
    //     return `
    //     <div style="color: #000000;font-size: 18px;">${item.label}</div>
    //     <ul style="white-space: nowrap;">
    //         <li>
    //             ${getLengedIconHTML(item.color||colorArray[0])}<span style="margin-left: 7px;color: #222222;font-size: 14px;">${legend[0].text || ''}：</span><span style="color: #222222;font-size: 14px;">${item.used }${item.unit || '个'}</span>
    //         </li>
    //         <li>
    //             ${getLengedIconHTML(colorArray[1])}<span style="margin-left: 7px;color: #222222;font-size: 14px;">${legend[1].text || ''}：</span><span style="color: #222222;font-size: 14px;">${item.rest }${item.unit || '个'}</span>
    //         </li>
    //     </ul>
    //     `;
    // }, dataList);
}

function getLengedIconHTML(color) {
    if(!color){
        let theme = $.cookie('topic');
        let bgMap = {
            'classic': '#32363C',
            'white': '#D8E0E6',
            'blue': '#293364',
        };
        color = bgMap[theme];
    }
    return `<span style="background: ${color};display: inline-block;border-radius: 50%;width: 10px;height: 10px;"></span>`;
}

function getToolTipsCssText(){
    return `
    position: fixed;
    z-index: 10;
    min-width: 130px;
    display:none;
    transition: 0.2s opacity;
    opacity: 0;
    padding: 10px;
    border: 1px solid ${THEME[1].borderColor};
    border-radius: 6px;
    background: ${THEME[1].backgroundColor};
    `;
}
/**
 * 添加事件
 * @param {*} wrap 
 */
function addEvent(wrap, getToolTipsHTML, dataList) {
    let oToolTips = document.createElement('div');
    oToolTips.style.cssText = getToolTipsCssText();
    wrap.appendChild(oToolTips);

    $(wrap).on("mouseover", '.sort-pgb-wrap', function (ev) {
        oToolTips.style.display = 'block';
        oToolTips.style.opacity = 0.85;
        let index = $(this).parents('li').index();
        oToolTips.innerHTML = getToolTipsHTML(dataList[index],index);
    });
    let timeId;
    $(wrap).on("mouseout", '.sort-pgb-wrap', function (ev) {
        oToolTips.style.opacity = 0;

        clearTimeout(timeId);
        timeId = setTimeout(function(){
            oToolTips.style.display = 'none';
        },200);
    });
    $(wrap).on("mousemove", '.sort-pgb-wrap', function (ev) {
        // 获取鼠标的位置
        let mouseX = ev.clientX;
        let mouseY = ev.clientY;

        let width = $(oToolTips).outerWidth();
        let height = $(oToolTips).outerHeight();

        oToolTips.style.left = mouseX + 20 + 'px';
        oToolTips.style.top = mouseY - height / 2 + 'px';
    });

    // $(document).on('mousemove',function(ev){
    //     let mouseX = ev.clientX;
    //     let mouseY = ev.clientY;
    //     console.log(mouseX);
    //     console.log(mouseY);
    // });
}

(function () {
    const oSortWrap = document.createElement('div');
    const legend = [{
        'text': '及时响应',
        'color': '#5C9DED'
    }, {
        'text': '未及时响应',
        'color': '#D8E0E6'
    }];
    const dataList = [{
            per: 0.8,
            label: '巡检',
            used: 80,
            rest: 20,
            color: 'red',
            usedName: '已完成',
            restName: '未完成'
        },
        {
            per: 0.8,
            label: '巡检',
            used: 80,
            rest: 20,
            usedName: '已完成',
            restName: '未完成'
        }
    ];

    renderBarChart(oSortWrap, dataList, {
        colorArray: ['#5C9DED', '#D8E0E6'],
        legend
    });
    document.body.appendChild(oSortWrap);
})()