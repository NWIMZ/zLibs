/**
 * @description 获取地址栏参数值
 * @param {*} key 参数名
 */
function getUrlParam(key) {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
    var params = window.location.search.substr(1);
    var matchArr = params.match(reg);
    var result;
    if (matchArr != null) {
        result = decodeURI(matchArr[2]);
    } else {
        result = null;
    }
    return result;
}