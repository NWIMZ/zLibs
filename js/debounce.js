/**
 * @description 函数防抖
 * @param {Function} action 要执行的函数
 * @param {Number} idle 空闲时间(ms)
 * 
 * 在连续调用同一个函数的时候，会很浪费性能，中间其实不需要执行，只需要在结束时执行一次。
 * 因此可以通过设置一个超时时间，如果两次调用一个函数的间隔没有超过此时间，则不执行
 * 间隔时间超过后才执行
 * 
 * 简单实现如下
 */
var debounce = function (idle, action) {
    var last;
    return function () {
        var ctx = this, args = arguments;
        clearTimeout(last);
        last = setTimeout(function () {
            action.apply(ctx, args);
        }, idle);
    };
};