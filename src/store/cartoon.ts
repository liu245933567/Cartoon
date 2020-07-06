/*
 * @Author: LiuYh
 * @Description: 储存动漫相关的信息
 * @Date: 2020-07-05 18:07:23
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-05 20:54:25
 */

import store from 'store';
import { CartoonDetail, SectionInfo, ICartoonHistory } from '@typings/cartoon';
import { CARTOON_HITORY } from './constans';

/**
 * 获取历史信息
 * @param cartoonPath 动漫地址
 */
export function getCartoonHistory(
  cartoonPath?: string
) {
  const cartoonInfos: { [key: string]: ICartoonHistory } | undefined = store.get(CARTOON_HITORY);

  if (cartoonPath) {
    return cartoonInfos && cartoonInfos[cartoonPath];
  }
  return cartoonInfos;
}

/**
 * 设置动漫历史记录
 * @param cartoonInfo 看过的动漫信息
 * @param sectionInfo 看过的章节信息
 */
export function setCartoonHistory(
  cartoonInfo: CartoonDetail,
  sectionInfo: SectionInfo
) {
  const {
    cartoonName,
    detailHref,
    coverPictureSrc,
    latestChapter
  } = cartoonInfo;
  const { sectionId, sectionTitle, sectionHref } = sectionInfo;
  let cartoonHistoryInfo = getCartoonHistory(cartoonInfo.detailHref) as ICartoonHistory | undefined;

  if (!cartoonHistoryInfo) {
    cartoonHistoryInfo = {
      cartoonName,
      detailHref,
      coverPictureSrc,
      latestChapter,
      anchorSection: sectionTitle,
      anchorSectionHref: sectionHref,
      watchedSections: [
        {
          sectionId,
          sectionTitle,
          sectionHref,
          isWatched: true
        }
      ]
    };
  } else {
    cartoonHistoryInfo.anchorSection = sectionTitle;
    cartoonHistoryInfo.anchorSectionHref = sectionHref;
    cartoonHistoryInfo.latestChapter = latestChapter;
    const findResult = cartoonHistoryInfo.watchedSections.find(
      (item) => item.sectionId === sectionId
    );

    if (!findResult) {
      cartoonHistoryInfo.watchedSections.push({
        sectionId,
        sectionTitle,
        sectionHref,
        isWatched: true
      });
    }
  }
  store.set(CARTOON_HITORY, {[detailHref]: cartoonHistoryInfo});
}
