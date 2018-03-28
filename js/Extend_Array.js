/*****************************/
/*                           */
/*       Array 对象扩展       */
/*                           */
/*****************************/



/**
 * 查找数组中的指定元素，返回下标，没有则返回-1，此方法在ES5的规范，但IE8不支持
 * @param {*} item 数组元素，通常只能为基本数据类型
 */
Array.prototype.indexOf = function(item) {
    var index = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i] === item) {
            index = i;
            break;
        }
    }
    return index;
};

/**
 * 删除数组中的指定元素
 * @param {*} item 数组元素或者下标
 */
Array.prototype.delete = function(item, type) {
    var index;
    // 没有指定类型
    if (!type) {
        if (typeof item == "number") {
            index = item;
        } else {
            index = this.indexOf(item);
        }
    } else {
        if (type == "index") {
            index = item;
        } else if (type == "item") {
            index = this.indexOf(item);
        }
    }
    if (index != -1) {
        this.splice(index, 1);
    }
    return this;
};