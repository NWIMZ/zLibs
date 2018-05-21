/* MVP */

var app = {};

// 处理数据
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
};

app.View = function() {
    var $num = $('#num'),
        $incBtn = $('#increase'),
        $decBtn = $('#decrease');

    this.render = function(model) {
        $num.text(model.getVal() + 'rmb');
    };

    this.init = function() {
        var presenter = new app.Presenter(this);
        $incBtn.click(presenter.increase);
        $decBtn.click(presenter.decrease);
    };
};

app.Presenter = function(view) {
    var _model = new app.Model();
    var _view = view;

    _view.render(_model);

    this.increase = function() {
        _model.add(1);
        _view.render(_model);
    };

    this.decrease = function() {
        _model.sub(1);
        _view.render(_model);
    };
};

(function() {
    var view = new app.View();
    view.init();
})();