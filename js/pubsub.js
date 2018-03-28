/**
 * @description 发布/订阅器
 * pubsub.publish('sth',msg)
 * pubsub.subscribe('sth',function(msg){})
 */
var pubsub = (function() {
    var q = {};
    var topics = {};
    var subId = -1;
    /**
     * @description 发布
     * @param {String} topic 发布的消息名
     * @param {*} args 参数（消息内容）
     */
    q.publish = function(topic, args) {
        if (!topics[topic]) {
            return;
        }
        var subs = topics[topic];
        var len = subs.length;
        while (len--) {
            subs[len].func(args);
        }
        return this;
    };
    /**
     * @description 订阅
     * @param {*} topic 订阅的消息名
     * @param {*} func 收到消息后的回调函数
     */
    q.subscribe = function(topic, func) {
        topics[topic] = topics[topic] || [];
        var _token = (++subId).toString();
        topics[topic].push({
            token: _token,
            func: func
        });
        return _token;
    };
    return q;
})();