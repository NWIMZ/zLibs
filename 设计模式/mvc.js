/* MVC */

var app = {};

app.Model = function() {
    var val = 0;
    this.add = function(v) {
        val += v;
    };
    this.sub = function(v) {
        val -= v;
    };
    this.getVal = function() {
        return val;
    };

    // 观察者模式
    // Model和View之间使用了观察者模式，View事先在此Model上注册，进而观察Model，以便更新在Model上发生改变的数据。
    var self = this;
    var views = [];

    this.register = function(view) {
        views.push(view);
    };
    this.notify = function() {
        for (var i = 0; i < views.length; i++) {
            views[i].render(self);
        }
    };
};

app.View = function(controller) {
    var $num = $('#num'),
        $incBtn = $('#increase'),
        $decBtn = $('#decrease');

    this.render = function(model) {
        $num.text(model.getVal() + 'rmb');
    };

    // view和controller之间使用了策略模式，这里View引入了Controller的实例来实现特定的响应策略，比如这个栗子中按钮的 click 事件：
    // 绑定事件
    $incBtn.click(controller.increase);
    $decBtn.click(controller.decrease);
};

app.Controller = function() {
    var model = null,
        view = null;
    this.init = function() {
        model = new app.Model();
        view = new app.View(this);

        model.register(view);
        model.notify();
    };

    this.increase = function() {
        model.add(1);
        model.notify();
    };
    this.decrease = function() {
        model.sub(1);
        model.notify();
    };
};

(function() {
    var controller = new app.Controller();
    controller.init();
})();