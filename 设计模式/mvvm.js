/* MVVM */
// 以vue为例

// Model
var data = {
    val: 0
};

// View

var template = `
<div id="app">
    <div>
        <span>{{ val }}rmb</span>
    </div>
    <div>
        <button @click="add(1)">+</button>
        <button @click="sub(1)">-</button>
    </div>
</div>
`;

// ViewModel
new Vue({
    el: '#app',
    data: data,
    methods: {
        add(v) {
            this.val += v;
        },
        sub(v) {
            this.val -= v;
        }
    }
});


// 双向数据绑定的方式

// 1.数据劫持(Vue)
/* 
Vue 采用数据劫持&发布/订阅模式的方式，通过ES5提供的Object.defineProrerty()方法来劫持各属性的getter、setter，
并在数据(对象)发生变动时通知订阅者，触发相应的监听回调。
并且，由于是在不同的数据上触发同步，可以精确的将变更发送给绑定的视图，而不是对所有的数据都执行一次检测。




 */

// 2.发布-订阅模式(Knockout、Backbone)

// 3.脏值检查