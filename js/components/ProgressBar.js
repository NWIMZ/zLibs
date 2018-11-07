/**
 * 进度条
 * @Author: Z 
 * @Date: 2018-07-31 14:47:23 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-07 14:57:49
 */
class ProgressBar {
    constructor(element, {
        value = 0,
        // min = 0,
        max = 1,
        cssText = '',
        progressColor = '#5C9DED',
        backgroundColor = '#D8E0E6',
        height = 12,
        className = ''
    } = {}) {
        this.element = element;
        this.value = value;
        // this.min = min;
        this.max = max;
        this.progressColor = progressColor;
        this.backgroundColor = backgroundColor;
        this.height = height;
        this.className = className;
        this.cssText = cssText;

        element && this.render();
    }
    /**
     * 
     * @param {Number} v 进度的多少
     */
    setVal(v) {
        this.element.querySelector('.js-z-progress').style.width = v;
        this.value = v;
        this.render();
    }
    /**
     * @returns 返回当前进度值
     */
    getVal() {
        return this.value;
    }
    // setMin(v) {
    //     this.min = v;
    // }
    /**
     * 
     * @param {Number} v 设置进度的最大值
     */
    setMax(v) {
        this.max = v;
    }
    /**
     * @returns {Number} 占的百分数（不含符号）
     */
    getPct() {
        let value = this.value;
        let max = this.max;
        return (value / max * 100);
    }
    render(opts) {
        this.element.innerHTML = this.getHTML(opts);
    }
    /**
     * @param {Object} opts 
     * @returns {String} 
     */
    getHTML(opts) {
        let width = this.getPct() + '%';
        const borderRadius = `border-radius: 0 ${this.height/2}px ${this.height/2}px 0;`;
        return `<div class="${this.className}" style="background-color: ${this.backgroundColor};height: ${this.height}px;${borderRadius};${this.cssText}">
            <div class="js-z-progress" style="width: ${width};height: 100%;${borderRadius};background-color: ${this.progressColor}"></div>
        </div>`;
        // style="position: relative;"
        // position: absolute;left: 0;top: 0;
    }
}
// module.exports = ProgressBar;

// Test:
(function () {
    let oC = document.createElement('div');
    document.body.appendChild(oC);
    var pb = new ProgressBar(oC, {});
    // pb.setVal(0.5)
})();