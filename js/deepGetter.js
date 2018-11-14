/**
 * @Author: Z 
 * @Date: 2018-11-09 10:11:53 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-09 10:14:53
 * @description 深层取值
 * @param {Object} obj 需要深层取值的对象/数组等可用点操作符获取属性的值
 * @param {Array<string>|String} attr 深层取值的每层的属性 ['aaa','bbb'] 'aaa.bbb'
 * @param {String} nullVal 需要取得值不存在时，需要返回的值，默认为null
 */
/**

 */
function deepGetter(obj,attr,nullVal = null){
    if(typeof attr == 'string'){
        attr = attr.split('.');
    }
    return attr.reduce(function (acc, key) {
        return acc && key in acc ? acc[key] : nullVal;
    }, obj);
}

// Test
var a = {
    'a': {
        'bb': {
            'ccc': {
                'dddd': 1
            }
        }
    }
};
var arr = [{
    '1': {
        '2': [0,1,2,{'4':'four'}]
    }
}]
var dddd = deepGetter(a,'a.bb.ccc.dddd');
var bb = deepGetter(a,['a','bb','ccc','dddd']);
var aaaa = deepGetter(a,'d.cc.bb.aaaa');

var four = deepGetter(arr,'0.1.2.3.4');
var _four = deepGetter(arr,'2.33');
console.log(dddd); // 1
console.log(bb); // 1
console.log(aaaa); // null

console.log(four);
console.log(_four);
