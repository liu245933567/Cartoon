/*
 * @Author: LiuYh
 * @Description: 信息修改页
 * @Date: 2020-07-23 18:04:26
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-24 14:07:00
 */

import React from 'react';
import NormalPage from '@components/NormalPage';
import { ImagePicker } from 'antd-mobile';
import { autobind } from 'core-decorators';
import { PhotoSlider } from 'react-photo-view';
import { uploader } from '@services/user';
import { DatePicker, Picker } from 'antd-mobile';
import moment from 'moment';
import 'react-photo-view/dist/index.css';

type IState = {
  images: string[];
  visible: boolean;
  photoIndex: number;
  userInfo: {
    nickName: string;
    brithday: string;
    gender: string;
  };
};
class EditUserInfo extends React.Component<{}, IState> {
  public nameRef: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.nameRef = React.createRef();
    this.state = {
      // files: imageData,
      images: [],
      visible: false,
      photoIndex: 0,
      userInfo: {
        nickName: '山有扶苏',
        brithday: '1991-12-24',
        gender: 'male'
      }
    };
  }

  /**
   * 获取formData格式数据
   * @param imgFile 图片文件
   */
  @autobind
  getFormData(imgFile: File) {
    const formData = new FormData();

    formData.append('type', imgFile.type || 'image/jpeg"');
    formData.append('size', String(imgFile.size));
    formData.append('name', imgFile.name);
    // 加上 lastModifiedDate 这个属性（请求参数） 在苹果的QQ浏览器上上传图片，后台保存图片黑图
    // formData.append("lastModifiedDate", imgFile.lastModifiedDate);
    formData.append('file', imgFile);
    return formData;
  }

  /**
   * 开始发送请求上传
   * @param {Object} imgData 状态中的img对象
   */
  async uploadImg(imageFile: File) {
    const formData = this.getFormData(imageFile);
    const { data } = await uploader(
      formData,
      /**
       * 原生获取上传进度的事件
       * 属性 lengthComputable 主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
       * 如果 lengthComputable 为 false ，就获取不到 progressEvent.total 和 progressEvent.loaded
       */
      (progressEvent) => {
        console.log(progressEvent);
      }
    );

    return data;
  }

  /**
   *
   * @param files 选择图片后的文件列表
   * @param type 类型
   * @param index
   */
  @autobind
  async onChange(
    files: Array<{
      url: string;
      [key: string]: any;
    }>,
    type: string,
    index?: number
  ) {
    let lastFile = files.pop();

    if (lastFile && lastFile.file) {
      const { result } = await this.uploadImg(lastFile.file);

      if (result) {
        this.setState({
          images: [...this.state.images, result.fileHref]
        });
      }
    }
  }

  @autobind
  setVisible(visible: boolean) {
    this.setState({ visible });
  }

  @autobind
  setPhotoIndex(photoIndex: number) {
    this.setState({ photoIndex });
  }

  public setUserInfo(type: 'nickName' | 'brithday' | 'gender', value: string) {
    const { userInfo } = this.state;

    this.setState({
      userInfo: {
        ...userInfo,
        [type]: value
      }
    });
  }

  render() {
    const { images, visible, photoIndex, userInfo } = this.state;

    return (
      <NormalPage headerText="个人信息修改">
        <div className="Edit-UserInfo-Page">
          <ImagePicker
            files={images.map((imageUrl) => ({
              url: `http://qiniu.yanyuge.xyz/${imageUrl}`
            }))}
            onChange={this.onChange}
            onImageClick={(index, fs) => {
              this.setState({ visible: true, photoIndex: index || 0 });
            }}
            selectable={images.length < 7}
            multiple={false}
          />
          <PhotoSlider
            images={images.map((item) => ({
              src: `http://qiniu.yanyuge.xyz/${item}`
            }))}
            visible={visible}
            onClose={() => this.setVisible(false)}
            index={photoIndex}
            onIndexChange={this.setPhotoIndex}
          />
          <div className="input-info-wrapper">
            <div className="add-tag">
              <span>{userInfo.nickName || '请输入昵称'}</span>
              <input
                value={userInfo.nickName}
                placeholder="请输入昵称"
                onChange={(e) => {
                  this.setUserInfo('nickName', e.target.value);
                }}
              />
            </div>
            <div className="motto-wrapper">
              {/* <div>个性签名</div> */}
              <textarea
                placeholder="您还没有编辑一个个性签名哦~"
                className="motto-text"
              />
            </div>

            <DatePicker
              mode="date"
              title="生日选择"
              format="YYYY-MM-DD"
              extra="人民万岁！"
              minDate={new Date('1900-01-01')}
              maxDate={new Date()}
              value={new Date('2019-12-14')}
              onOk={(date) => {
                this.setUserInfo('brithday', moment(date).format('YYYY-MM-DD'));
              }}
            >
              <div className="bir-info">
                <span>生日</span>
                <span>{userInfo.brithday}</span>
              </div>
            </DatePicker>
            <Picker
              data={[
                [
                  {
                    label: '男',
                    value: 'male'
                  },
                  {
                    label: '女',
                    value: 'famale'
                  }
                ]
              ]}
              title="选择季节"
              cascade={false}
              extra="请选择(可选)"
              value={[`${userInfo.gender}`]}
              onOk={(v) => {
                console.log(v);
                this.setUserInfo('gender', v[0]);
              }}
            >
              <div className="bir-info">
                <span>性别</span>
                <span>{userInfo.gender === 'male' ? '男' : '女'}</span>
              </div>
            </Picker>
          </div>
          <div className="save-btn">
            <button>保存修改</button>
          </div>
        </div>
      </NormalPage>
    );
  }
}

export default EditUserInfo;
