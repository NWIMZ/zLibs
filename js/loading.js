/**
 * loading
 * loading.show()
 * loading.hide()
 */
var loading = (function() {
    var IMG_URL = 'data:image/gif;base64,R0lGODlhJQAlAJECAL3L2AYrTv///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAAJQAlAAACi5SPqcvtDyGYIFpF690i8xUw3qJBwUlSadmcLqYmGQu6KDIeM13beGzYWWy3DlB4IYaMk+Dso2RWkFCfLPcRvFbZxFLUDTt21BW56TyjRep1e20+i+eYMR145W2eefj+6VFmgTQi+ECVY8iGxcg35phGo/iDFwlTyXWphwlm1imGRdcnuqhHeop6UAAAIfkEBQoAAgAsEAACAAQACwAAAgWMj6nLXAAh+QQFCgACACwVAAUACgALAAACFZQvgRi92dyJcVJlLobUdi8x4bIhBQAh+QQFCgACACwXABEADAADAAACBYyPqcsFACH5BAUKAAIALBUAFQAKAAsAAAITlGKZwWoMHYxqtmplxlNT7ixGAQAh+QQFCgACACwQABgABAALAAACBYyPqctcACH5BAUKAAIALAUAFQAKAAsAAAIVlC+BGL3Z3IlxUmUuhtR2LzHhsiEFACH5BAUKAAIALAEAEQAMAAMAAAIFjI+pywUAIfkEBQoAAgAsBQAFAAoACwAAAhOUYJnAagwdjGq2amXGU1PuLEYBACH5BAUKAAIALBAAAgAEAAsAAAIFhI+py1wAIfkEBQoAAgAsFQAFAAoACwAAAhWUL4AIvdnciXFSZS6G1HYvMeGyIQUAIfkEBQoAAgAsFwARAAwAAwAAAgWEj6nLBQAh+QQFCgACACwVABUACgALAAACE5RgmcBqDB2MarZqZcZTU+4sRgEAIfkEBQoAAgAsEAAYAAQACwAAAgWEj6nLXAAh+QQFCgACACwFABUACgALAAACFZQvgAi92dyJcVJlLobUdi8x4bIhBQAh+QQFCgACACwBABEADAADAAACBYSPqcsFADs=';
    var IMG_SIZE = 32;
    var el = document.createElement("div");
    el.style.cssText = 'position: fixed;' +
        'left: 0;' +
        'top:0;' +
        'z-index: 2147483647;' +
        'width: 100%;' +
        'height: 100%;' +
        'trans: 100%;' +
        'background: rgba(0,0,0,0.2);';

    var img = document.createElement("img");
    img.style.cssText = 'position: absolute;' +
        'left: 50%;' +
        'top: 50%;' +
        'margin-left: -' + (IMG_SIZE / 2) + 'px;' +
        'margin-top: -' + (IMG_SIZE / 2) + 'px;';

    el.appendChild(img);
    img.src = IMG_URL;
    document.documentElement.appendChild(el);
    el.style.display = 'none';

    var show = function() {
        el.style.display = "block";
    };
    var hide = function() {
        el.style.display = "none";
    };
    return {
        show: show,
        hide: hide,
    };
})();