/*
 * @Author: LiuYh
 * @Description: 动漫详情，章节列表组件
 * @Date: 2020-07-02 21:32:55
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-02 21:49:33
 */

import React from 'react';
import { SectionBaseInfo } from '@typings/cartoon';

type IProps = {
  sectionList: SectionBaseInfo[] | undefined;
  clickHandle: (sectionInfo: SectionBaseInfo) => void;
};

const SectionList: React.FC<IProps> = ({
  sectionList,
  clickHandle
}: IProps) => {
  return (
    <div className="SectionList-Component-Wrapper">
      <div className="section-list">
        {sectionList && sectionList.map((section) => {
          return (
            <div
              key={section.sectionHref}
              className={`section-item ${section.isWatched && 'section-item-watched'}`}
              onClick={() => {
                clickHandle(section);
              }}
            >
              {section.sectionTitle}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionList;
