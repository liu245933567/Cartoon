/**
 * js获取url地址，如： http://localhost:8083/
 * @returns {String} BASEURL
 */
export function getRootHost() {
  const curWwwPath = window.document.location.href;
  const pathName = window.document.location.pathname;
  const pos = curWwwPath.indexOf(pathName);
  const localhostPaht = curWwwPath.substring(0, pos);

  return localhostPaht;
}

/**
 * 添加 rem 适配
 */
export function setRem() {
  (function (doc, win) {
    var docEl = doc.documentElement,
      resizeEvt =
        'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;

        if (!clientWidth) {
          return;
        }
        if (clientWidth >= 640) {
          docEl.style.fontSize = '37.5px';
        } else {
          docEl.style.fontSize = 75 * (clientWidth / 750) + 'px';
        }
        if (doc.body.style.display !== 'block') {
          doc.body.style.display = 'block';
        }
      };

    if (!doc.addEventListener) {
      return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    recalc();
  })(document, window);
}
