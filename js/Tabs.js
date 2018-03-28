/**
 * @description 选项卡组件
 * @param {String} selector 选项卡标签
 * @param {String} target 选项卡对应内容
 * 
 * @Date 2017.09.29
 * @Author Warden
 * 调用方式：
<ul id='selector'><li data-target='1'></li></ul>
<ul id='target'><li data-content='1'></li></ul>
var xxTab = new TabNav('selector',"target");
xxTab.setStyle();
 * 
 */
function TabNav(selector, target, isBindEvent) {
    this.TAB = 'data-ztabnav'; //选项卡容器的属性
    this.TARGET = 'data-target'; //指定选项卡对应内容的属性
    this.CONTENT = 'data-content'; //内容标识属性
    this.ACTIVE = 'active'; //激活类名

    this.isBindEvent = isBindEvent;

    this.selectorId = selector;
    this.targetId = target;
    this.$tabWrap = $('#' + this.selectorId);
    //this.$tabWrap = $('*[' + this.TAB + '=' + this.targetId + ']');
    this.$contentWrap = $('#' + this.targetId);
    this.$contents = $('#' + this.targetId + '>li');

    this.init();
}
TabNav.prototype.init = function() {
    var This = this;
    if (!this.isBindEvent) {
        //选项卡点击事件
        this.$tabWrap.on('click', 'li', function() {
            if ($(this).attr(This.TARGET)) { //找到有data-target属性的元素
                var contentName = $(this).attr(This.TARGET);
                //清除所有选项卡active类
                $(this).addClass(This.ACTIVE).siblings().removeClass(This.ACTIVE);

                // 显示对应内容
                This.$contents.each(function(index, element) {
                    var content = $(element);
                    if (content.attr(This.CONTENT) == contentName) {
                        $(content).addClass(This.ACTIVE);
                    } else {
                        $(content).removeClass(This.ACTIVE);
                    }
                });
            }
        });
    }
};
// FIXME: 设置样式
TabNav.prototype.setStyle = function() {

    var css = '#' + this.targetId + '>li{display: none;}' +
        '#' + this.targetId + '>li.active{display: block;}';
    var style = '<style>' + css + '</style>';

    var _index = 0;
    var This = this;
    this.$tabWrap.children().each(function(index, element) {
        if ($(element).hasClass("active")) {
            _index = $(element).attr(This.TARGET);

        }
    });

    this.$contents.each(function(index, element) {
        if ($(element).attr(This.CONTENT) == _index) {
            if (This.isBindEvent) {
                $(element).addClass('active');
            }
            This.$tabWrap.children(".active").trigger("click");
        }
    });

    $('body').append(style);
};