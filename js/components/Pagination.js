/**
 * @Author: Z 
 * @Date: 2018-05-18 15:44:29 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-05 15:48:27
 * @description 分页组件
 * @version v2.0.2
 * @param {String} id 元素id
 * @param {Number} pageSize 一页多少条
 * @param {Number} totalCount 数据总条数
 * @param {Function} callback 请求数据的函数
 * @requires jQuery
 * @author Warden
 */
function Pagination(id, pageSize, totalCount, callback) {
    this.id = id;
    this.$element = $('#' + id);
    this.pageSize = pageSize;
    this.iPage = 1; // 当前页数
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageSize); //总页数
    this.flag = true; // 防止多次绑定事件

    this.callback = callback; // 分页执行的操作（获取、渲染数据）
    this.init();
}
Pagination.prototype.init = function() {
    this.$element.addClass('pagination fr');
    var template = '<ul class="child-fl">' +
        '<li><a>每页' + this.pageSize + '条，共 <span class="totalPage">' + this.totalPage + '</span> 页</a>，共<span class="totalCount">' + this.totalCount + '</span>条</li>' +
        '<li><a href="javascript:;" class="firstPage">首页</a></li>' +
        '<li><a href="javascript:;" class="prevPage"></a></li>' +
        '<li><ul class="pageNav"></ul></li>' +
        '<li><a href="javascript:;" class="nextPage"></a></li>' +
        '<li><a href="javascript:;" class="lastPage">尾页</a></li>' +
        '</ul>';
    /*+ '<li><span>到第</span><input type="text" style="width: 32px;margin-right: 2px;padding:0;text-align: center;" class="form-control selectPage pull-left" /><span>页</span></li>'
    + '<li><button class="">确定</button></li>';*/
    // 渲染模板
    this.$element.html(template);

    //$('#' + this.id + ' .totalPage').html(this.totalPage);// 渲染总页数

    this.getPageNav();
    this.bindEvent();
};
// 重设一次，当筛选条件发生变化时改变总页数
Pagination.prototype.reset = function(count, pageIndex) {
    pageIndex = pageIndex || 1;
    this.iPage = pageIndex;
    this.totalPage = Math.ceil(count / this.pageSize);
    $('#' + this.id + ' .totalPage').html(this.totalPage);
    $('#' + this.id + ' .totalCount').html(count);
    this.getPageNav();
};
Pagination.prototype.getPageNav = function() {
    //分页
    var pageNavHtml = '';

    //加载当前页的前后4页
    var start = 1;
    if ((this.iPage - 4) > 0) {
        start = this.iPage - 4;
        if (this.totalPage - 8 < start) {
            //start = this.totalPage-8;
        }
    }
    for (var i = start; i < (8 + start); i++) {
        pageNavHtml += '<li><a href="javascript:;">' + i + '</a></li>';
        if (i >= this.totalPage) {
            break;
        }
    }
    $('#' + this.id + ' .pageNav').html(pageNavHtml);

    // 初始化激活项
    this.setActive();
};
//添加激活类 
Pagination.prototype.setActive = function() {
    var iPage = this.iPage;
    $('#' + this.id + ' .pageNav li').each(function(index, element) {
        if (element.innerText == iPage) {
            $(element).addClass('active').siblings().removeClass('active');
        }
    });
};
Pagination.prototype.bindEvent = function() {
    if (this.flag) {
        var This = this;
        //上一页
        $('#' + This.id + ' .prevPage').on('click', function(e) {
            if (This.iPage > 1) {
                This.iPage--;
                This.getPageNav();
                This.callback(This.iPage);
            } else {
                return false;
            }

        });
        //下一页
        $('#' + This.id + ' .nextPage').on('click', function(e) {
            if (This.iPage < This.totalPage) {
                This.iPage++;
                This.getPageNav();
                This.callback(This.iPage);
            } else {
                return false;
            }
        });

        //分页123按钮
        $('#' + This.id + ' .pageNav').on('click', 'a', function(e) {
            var targetPage = parseInt(e.target.innerText);
            if (This.iPage == targetPage) {
                return false;
            }
            This.iPage = targetPage;
            This.getPageNav();
            This.callback(This.iPage);
        });

        //第一页
        $('#' + This.id + ' .firstPage').on('click', function(e) {
            if (This.iPage == 1) {
                return;
            }
            This.iPage = 1;
            This.getPageNav();
            This.callback(this.iPage);
        });
        //最后一页
        $('#' + This.id + ' .lastPage').on('click', function(e) {
            if (This.iPage == This.totalPage) {
                return;
            }
            This.iPage = This.totalPage;
            This.getPageNav();
            This.callback(This.iPage);
        });

    }
    this.flag = false;
    //添加激活类 $('#' + This.id).attr('data-nowpage')
};

//分页END