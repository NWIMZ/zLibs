/**
 * 下载
 * @param {String} url 下载链接
 */
function download(url,timeout = 20000){
    var elem = document.createElement("iframe");   
    // elem.style.cssText = 'display: none;'
    elem.style.cssText = 'border: none;';
    elem.onload = function(){
        console.log('loaded');
    };
    elem.src = url;
    document.body.appendChild(elem);
    setTimeout(function(){
        document.body.removeChild(elem);
    },timeout);
}