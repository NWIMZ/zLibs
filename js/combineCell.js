/**
 * @description 合并表格行
 * @param {Array} list 数据
 * @param {Array} fieldArr 要合并的字段
 * 
 * 渲染时根据dis属性控制显示与否，span属性控制rowspan的值
 */
function combineCell(list, fieldArr) {
    for (var j = 0; j < fieldArr.length; j++) {
        var field = fieldArr[j];
        var k = 0;
        while (k < list.length) {
            list[k][field + 'span'] = 1;
            list[k][field + 'dis'] = false;
            for (var i = k + 1; i <= list.length - 1; i++) {
                if (list[k][field] == list[i][field] && list[k][field] != '') {
                    list[k][field + 'span']++;
                    list[k][field + 'dis'] = false;
                    list[i][field + 'span'] = 1;
                    list[i][field + 'dis'] = true;
                } else {
                    break;
                }
            }
            k = i;
        }
    }
    return list;
}