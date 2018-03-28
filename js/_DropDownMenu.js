/**
 * 下拉菜单
 */
function DropDownMenu(target, html) {
    this.target = target;
    this.html = html;
    this.$target = $(target);
    this.open();
    this.bindEvent();
}
DropDownMenu.prototype.bindEvent = function() {
    var This = this;
    $(window).on("resize", function() {
        This.setStyle();
    });
    this.$drowDown.find(".mask").on("click", function() {
        This.close();
    })
}
DropDownMenu.prototype.open = function() {
    var html = "<div class='drop-down-menu'><div class='mask'></div><div class='tri'></div><div class='wrap'>" + this.html + "</div></div>";
    this.$drowDown = $(html);
    this.setStyle();
    $("body").append(this.$drowDown);
}

DropDownMenu.prototype.setStyle = function() {
    var offsetH = 5;

    var $target = this.$target;
    var x = $target.offset().left;
    var y = $target.offset().top;

    var height = $target.height();
    var width = $target.width();

    var css = 'left: ' + (x + width / 2) + 'px;' + 'top:' + (y + height + offsetH) + 'px;position: absolute;z-index: 999999999999;';
    this.$drowDown.prop("style", css);
}

DropDownMenu.prototype.close = function() {
    $(this.$drowDown).remove();
}