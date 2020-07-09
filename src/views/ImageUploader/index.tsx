import React from 'react';
import NormalPage from '@components/NormalPage';
import { ImagePicker } from 'antd-mobile';
import { autobind } from 'core-decorators';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/index.css';

const data = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121'
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122'
  }
];

class ImageUploader extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      files: data,
      multiple: false,
      visible: false,
      photoIndex: 0
    };
  }

  @autobind
  onChange(files, type, index) {
    console.log(files, type, index);
    this.setState({
      files
    });
  }
  @autobind
  setVisible(aa) {
    this.setState({ visible: aa });
  }
  @autobind
  setPhotoIndex(index) {
    this.setState({ photoIndex: index });
  }

  render() {
    const { files, visible, photoIndex } = this.state;
    const photoImages = [
      'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
      'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'
    ];

    return (
      <NormalPage headerText="头像选择">
        <div>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => {
              this.setState({ visible: true });
              console.log(index, fs);
            }}
            selectable={files.length < 7}
            multiple={this.state.multiple}
          />
          <PhotoSlider
            images={photoImages.map((item) => ({ src: item }))}
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
