/**
 * 
 * @param {Element} el 元素
 * @param {Number} edgeNum 边数
 * @param {Object} opts 配置项 
 */
function renderPolygon(el,edgeNum,opts={width: 5,color: 'rgb(27,20,45)'}){
    if(edgeNum<=2){
        alert('多边形边数必须大于2');
        return false;
    }

}