/**
 * 进度条
 * @Author: Z 
 * @Date: 2018-07-31 14:47:23 
 * @Last Modified by: Z
 * @Last Modified time: 2018-11-05 15:48:33
 */
class ProgressBar{
    constructor({elem,value,min,max,cssText,progressColor,backgroundColor,height,className}){
        this.elem = elem;
        this.value = value || 0;
        this.min = min || 0;
        this.max = max || 1;
        this.progressColor = progressColor||'#5C9DED';

        let theme = 'white';
        let bgMap = {
            'classic': '#32363C',
            'white': '#D8E0E6',
            'blue': '#293364',
        };
        this.backgroundColor = backgroundColor||bgMap[theme];
        this.height = height || 12;
        this.className = className || '';
        this.cssText = cssText || '';
    }
    /**
     * 
     * @param {Number} v 进度的多少
     */
    setVal(v){
        this.elem.querySelector('.js-z-progress').style.width = v;
        this.value = v;
        this.render();
    }
    getVal(){
        return this.value;
    }
    setMin(v){
        this.min = v;
    }
    setMax(v){
        this.max = v;
    }
    /**
     * @returns {String}
     */
    getPct(){
        let value = this.value;
        let max = this.max;
        return (value / max * 100);
    }
    render(opts){
        this.elem.innerHTML = this.getHTML(opts);
    }
    /**
     * @param {Object} opts 
     * @returns {String} 
     */
    getHTML(opts){
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