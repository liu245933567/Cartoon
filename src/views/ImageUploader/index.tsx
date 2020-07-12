import React from 'react';
import NormalPage from '@components/NormalPage';
import { ImagePicker } from 'antd-mobile';
import { autobind } from 'core-decorators';
import { PhotoSlider } from 'react-photo-view';
import { uploader } from '@services/user';
import 'react-photo-view/dist/index.css';

type IState = {
  images: string[];
  visible: boolean;
  photoIndex: number;
}
class ImageUploader extends React.Component<{}, IState > {
  constructor(props: any) {
    super(props);
    this.state = {
      // files: imageData,
      images: [],
      visible: false,
      photoIndex: 0
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

    // if (resData.commonRes && resData.commonRes.isOk) {
    //   this.handleUploadEnd(imgData, resData, 2);
    // } else {
    //   this.handleUploadEnd(imgData, undefined, 3);
    // }
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
      const {result} = await this.uploadImg(lastFile.file);

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

  render() {
    const { images, visible, photoIndex } = this.state;

    return (
      <NormalPage headerText="头像选择">
        <div>
          <ImagePicker
            files={images.map(imageUrl => ({url: `http://qiniu.yanyuge.xyz/${imageUrl}`}))}
            onChange={this.onChange}
            onImageClick={(index, fs) => {
              this.setState({ visible: true, photoIndex: index || 0 });
            }}
            selectable={images.length < 7}
            multiple={false}
          />
          <PhotoSlider
            images={images.map((item) => ({ src: `http://qiniu.yanyuge.xyz/${item}` }))}
            visible={visible}
            onClose={() => this.setVisible(false)}
            index={photoIndex}
            onIndexChange={this.setPhotoIndex}
          />
        </div>
      </NormalPage>
    );
  }
}

export default ImageUploader;
