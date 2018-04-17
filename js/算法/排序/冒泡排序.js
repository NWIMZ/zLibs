/**
 * Bubble Sort 冒泡排序
 * https://www.jianshu.com/p/1b4068ccd505
 * https://www.cnblogs.com/liyongshuai/p/7197962.html
 * 
 * 思想:
 * 1.比较相邻的元素。如果第一个比第二个大，就交换他们两个。
 * 2.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
 * 3.针对所有的元素重复以上的步骤，除了最后一个。
 * 4.持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
 * 
 * @param {*} array 
 * 
 */
function bubbleSort(array) {
    var len = array.length;
    var _temp;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                _temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = _temp;
            }
        }
    }
    return array;
}

// 进阶版

function bubbleSort(array) {
    var i = array.length - 1;
    var position = 0;
    while(i>0){
        for(var j = 0;j<i;j++){
        }
    }

}