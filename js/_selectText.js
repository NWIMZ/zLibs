/**
 * 选中一个元素中的文字
 * @param {*} elementSelector 
 */
function selectText(elementSelector) {
    var elem = document.querySelector(elementSelector);
    var range;
    try {
        var selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(elem);
        selection.removeAllRanges();
        selection.addRange(range);
        console.log('getSelection');
    } catch (error) {
        console.log(error);
        try {
            range = document.body.createTextRange();
            range.moveToElementText(elem);
            range.select();
            console.log('creatTextRange');
        } catch (error) {
            console.warn("your browser dosen't support select text");
        }
    }
}