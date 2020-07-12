import {
  uploaderURL,
  cartoonDetailURL,
  sectionDetailURL,
  cartoonHomeInfoURL
} from './url';

/**
 * 校验按当前请求是否需要登录
 * @param url 当前请求的url
 */
export function needLogin(url: string) {
  /** 需要校验登录的接口地址 */
  const needLoginUrls = [
    uploaderURL,
    cartoonDetailURL,
    sectionDetailURL,
    cartoonHomeInfoURL
  ];
  let need = false;

  for (let i = 0; i < needLoginUrls.length; i++) {
    if (url.indexOf(needLoginUrls[i]) > -1) {
      need = true;
      break;
    }
  }

  return need;
}
