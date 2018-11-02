const getReadableNum = (num) => {
    num += '';
    let len = num.length;
    let _times = (len - len%3) / 3;
    let result = [];
    for(let i = 1;i<=_times+1;i++){
        console.log(num.substr(i*-3,(i*-3 + 3)));
        if(num!=''){
            result.unshift(num.slice(-3));
        }
        num = num.slice(0,-3);
    }
    return result.join(',');
};
// Test:
// console.log(getReadableNum(123));
// console.log(getReadableNum(1234));
// console.log(getReadableNum(12345));
// console.log(getReadableNum(1234567));
// console.log(getReadableNum(12345678));
// console.log(getReadableNum(123456789));
// console.log(getReadableNum(1234567890));