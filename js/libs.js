/**
 * @description 用于代替jQuery等库的工具方法
 * @author Wardne
 * @version 1.0
 */

/**
 * 网页可见区域高度和宽度
 * body元素的宽高，不包括margin border
 */
const bodyWidth = document.body.clientWidth;
const bodyHeihgt = document.body.clientHeight;

/**
 * body元素的宽高，包括border
 */
const pageWidth = document.body.offsetWidth;
const pageHeight = document.body.offsetHeight;

/**
 * 不包括border
 */
const scrollWidth = document.body.scrollWidth;
const scrollHeight = document.body.scrollHeight;

/**
 * 屏幕宽高
 */
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

/**
 * 屏幕可用工作区宽高
 */
const windowWidth = window.screen.availWidth;
const windowHeight = window.screen.availHeight;

console.log(bodyWidth);
console.log(pageWidth);
console.log(scrollWidth);

console.log(bodyHeihgt);
console.log(pageHeight);
console.log(scrollHeight);

let html = `
    <p>screen: ${screenWidth}*${screenHeight}
    </p>
    <p>
    window:${windowWidth}*${windowHeight}
    </p>
`;
document.getElementById('test').innerHTML = html;