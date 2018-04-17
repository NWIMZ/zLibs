/**
 * Quick Sort 快速排序
 * C. A. R. Hoare 1960
 * http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
 * 
 * 思想：
 * 1.在数据集之中，选择一个元素作为"基准"（pivot）。
 * 2.所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
 * 3.对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 * 
 * @param {Array} array 
 * 
 */
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }
    var pivot = array[0];
    var left = [];
    var right = [];

    var _item;
    for (var i = 1; i < array.length; i++) {
        _item = array[i];
        if (_item < pivot) {
            left.push(_item);
        } else {
            right.push(_item);
        }
    }

    return quickSort(left).concat([pivot],quickSort(right));
}