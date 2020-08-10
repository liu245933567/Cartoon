/*
 * @Author: LiuYh
 * @Description: 信息修改页
 * @Date: 2020-07-23 18:04:26
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-24 15:46:26
 */

import React from 'react';
import NormalPage from '@components/NormalPage';
import { ImagePicker } from 'antd-mobile';
import { autobind } from 'core-decorators';
import { PhotoSlider } from 'react-photo-view';
import { uploader } from '@services/user';
import { DatePicker, Picker } from 'antd-mobile';
import { QINIUHOST } from '@config/index';
import moment from 'moment';
import { getHeadPortrait } from '@services/user';
import { connect } from 'react-redux';
import { AppState } from '@redux/reducers';
import { bindActionCreators } from 'redux';
import { requestModifyUserInfo } from '@redux/actions/user';
import { IGlobalReduceState } from '@redux/reducers/global';
import { ModifyUserInfoParam } from '@typings/user';
import 'react-photo-view/dist/index.css';

type IProps = IGlobalReduceState & {
  requestModifyUserInfo: typeof requestModifyUserInfo;
};
type IState = {
  images: string[];
  visible: boolean;
  photoIndex: number;
  userInfo: ModifyUserInfoParam;
};

class EditUserInfo extends React.Component<IProps, IState> {
  public nameRef: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    const { nickname, brithday, gender, motto } = props.userInfo || {
      nickname: '老铁',
      brithday: '1991-12-24',
      gender: 'male',
      motto: ''
    };

    super(props);
    this.nameRef = React.createRef();
    this.state = {
      // files: imageData,
      images: [],
      visible: false,
      photoIndex: 0,
      userInfo: {
        nickname,
        brithday,
        gender,
        motto: motto || ''
      }
    };
  }

  UNSAFE_componentWillMount() {
    this.toGetHeadPortrait();
  }

  async toGetHeadPortrait() {
    const { data } = await getHeadPortrait();

    console.log(data.result);
    this.setState({
      images: data.result || []
    });
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

  /** 设置状态信息 */
  public setUserInfo(
    type: 'nickname' | 'brithday' | 'gender' | 'motto',
    value: string
  ) {
    const { userInfo } = this.state;

    this.setState({
      userInfo: {
        ...userInfo,
        [type]: value
      }
    });
  }

  /** 确认修改 */
  @autobind
  confirmModify() {
    const { nickname, brithday, gender, motto } = this.state.userInfo;

    console.log(11111111111);
    this.props.requestModifyUserInfo({
      nickname,
      brithday,
      gender,
      motto
    });
  }

  render() {
    const { images, visible, photoIndex, userInfo } = this.state;

    return (
      <NormalPage headerText="个人信息修改">
        <div className="Edit-UserInfo-Page">
          <ImagePicker
            files={images.map((imageUrl) => ({
              url: `${QINIUHOST}${imageUrl}`
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
              src: `${QINIUHOST}${item}`
            }))}
            visible={visible}
            onClose={() => this.setVisible(false)}
            index={photoIndex}
            onIndexChange={this.setPhotoIndex}
          />
          <div className="input-info-wrapper">
            <div className="add-tag">
              <span>{userInfo.nickname || '请输入昵称'}</span>
              <input
                value={userInfo.nickname}
                placeholder="请输入昵称"
                onChange={(e) => {
                  this.setUserInfo('nickname', e.target.value);
                }}
              />
            </div>
            <div className="motto-wrapper">
              {/* <div>个性签名</div> */}
              <textarea
                placeholder="您还没有编辑一个个性签名哦~"
                className="motto-text"
                value={userInfo.motto}
                onChange={(e) => {
                  this.setUserInfo('motto', e.target.value);
                }}
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
            <button onClick={this.confirmModify}>保存修改</button>
          </div>
        </div>
      </NormalPage>
    );
  }
}

export default connect(
  (state: AppState) => state.global,
  (dispatch) =>
    bindActionCreators(
      {
        requestModifyUserInfo
      },
      dispatch
    )
)(EditUserInfo);
