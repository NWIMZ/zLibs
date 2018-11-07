/*
 * @Author: Z 
 * @Date: 2018-10-31 16:25:15 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-07 11:26:42
 */
const getReadableNum = (num) => {
    // 如果不是数字直接返回
    if(isNaN(num)){
      return num;
    }
    num += '';
    // 小数点后面的
    let xs = '';
    let docIndex = num.indexOf('.');
    if(docIndex!=-1){
      xs = num.slice(docIndex);
      num = num.slice(0,docIndex);
    }
    // 整数部分
    let len = num.length;
    let _times = (len - len%3) / 3;
    let result = [];
    for(let i = 1;i<=_times+1;i++){
        if(num!=''){
            result.unshift(num.slice(-3));
        }
        num = num.slice(0,-3);
    }
    return result.join(',') + xs;
  };
  // Test:
  // console.log(getReadableNum('aaa'));
  // console.log(getReadableNum('123'));
  // console.log(getReadableNum('1234.567'));
  // console.log(getReadableNum(123.567));
  // console.log(getReadableNum(1234.567));
  // console.log(getReadableNum(123));
  // console.log(getReadableNum(123));
  // console.log(getReadableNum(1234));
  // console.log(getReadableNum(12345));
  // console.log(getReadableNum(1234567));
  // console.log(getReadableNum(12345678));
  // console.log(getReadableNum(123456789));
  // console.log(getReadableNum(1234567890));