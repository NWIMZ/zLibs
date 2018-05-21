
// DOM 扩展
/**
 * 类似$ele.next()在某个元素后面添加一个元素
 * @param {*} node
 */
Node.prototype.next = function(node){
    // 当前元素为参考元素
    var refEle = this;
    // 获取父节点
    var _parentNode = refEle.parentNode;
    // 获取最后一个节点
    var _lastNode = _parentNode.lastChild;
    if (_lastNode === refEle){
        // 如果参考节点是最后一个节点，那直接把目标节点插入父节点最后
        _parentNode.appendChild(node);
    }else{
        // 否则就在目标节点的下一个的节点插入之前插入
        _parentNode.insertBefore(node, refEle.nextSibling);
    }
};