/**
 * AngularJS中，使用$http的post时，需要注意以下几点
 * 1.不能使用params，否则会把参数拼接在url后面。params这个参数是用在get请求中的，post/put/patch需要使用data传递参数
 * 2.修改headers headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
 */


var app = angular.module('app', []);

app.config(function($httpProvider) {
    $httpProvider.defaults.transformRequest = function(obj) {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    }
})

