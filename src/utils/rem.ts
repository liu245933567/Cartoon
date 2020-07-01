/**
 * 根据浏览器分辨率设置视图大小
 */
export function setRemAdapter(doc: Document, win: Window) {
  var docEl = doc.documentElement;
  var resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function () {
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
}
