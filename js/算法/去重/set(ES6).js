/**
 * Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
 * Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。
 */
function unique(arr) {
    return Array.from(new Set(arr));
}