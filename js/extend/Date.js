/*****************************/
/*                           */
/*        Date 对象扩展       */
/*                           */
/*****************************/


/**
 * 计算yyyy-mm-dd型日期的天数差
 * @param {String} s1 yyyy-mm-dd
 * @param {String} s2 yyyy-mm-dd
 */
Date.prototype.getDateDifday = function(s1, s2) {
    var d1 = new Date(Date.parse(s1.replace(/-/g, "/")));
    var d2 = new Date(Date.parse(s2.replace(/-/g, "/")));
    var dd = d2.getTime() - d1.getTime(); // 计算时间差
    var r = Math.floor(dd / (1000 * 60 * 60 * 24));
    return r;
};

/**
 * 格式化Date对象指定格式
 * @param {String} fmt 格式模板
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * 根据时间间隔，获取一个Date
 * @param {String} strInterval 单位:s秒 m分 h时 d天 w星期 q季度 m月 y年
 * @param {String} Number 数
 */
Date.prototype.dateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's':
            return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'm':
            return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h':
            return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd':
            return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w':
            return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q':
            return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm':
            return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y':
            return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
};