
/**
 * 每三位数字增加一个，
 * @param {*} num 数字
 * @return {string} 
 */
const getReadableNum = (num) => {
    // 如果不是数字直接返回
    if (typeof num !== 'number' && typeof num !== 'string') {
        return num || '';
    }
    if (isNaN(num)) {
        return num || '';
    }
    num += '';
    // 整数部分
    let zs = num.split('.')[0];
    // 小数部分
    let xs = num.split('.')[1] ? ('.' + num.split('.')[1]) : '';

    let len = zs.length;
    let result = [];
    for (let i = 0; i < len; i = i + 3) {
        if (zs != '') {
            result.unshift(zs.slice(-3));
        }
        zs = zs.slice(0, -3);
    }
    return result.join(',') + xs;
};
// TEST:
console.log(getReadableNum(NaN))
console.log(getReadableNum(null))
console.log(getReadableNum(undefined))
console.log(getReadableNum([1,2,3]))
console.log(getReadableNum(Number(2)))
console.log(getReadableNum(Number(123)))
console.log(getReadableNum(Number(1234)))
console.log(getReadableNum(Number(123456789.123456789)))

console.log(getReadableNum(0))
console.log(getReadableNum(123))
console.log(getReadableNum(1234))
console.log(getReadableNum(123456789.123456789))
console.log(getReadableNum(123456789.123456789))
console.log(getReadableNum('123'))
console.log(getReadableNum('1234'))
console.log(getReadableNum('123456789.123456789'))
