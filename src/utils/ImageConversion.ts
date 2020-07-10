import EXIF from 'exif-js';

/** 图片转化 */
export default class ImageConversion {
  /** 是否是 IOS 环境 */
  private readonly IS_IOS = Boolean(
    window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  );
  /** 是否进行图片压缩 */
  private toCompress = true;
  /** 超过多少大小进行压缩 单位： b */
  private compressMaxSize = 2048 * 1024;
  /** 图片压缩比例 百分比前数字 20% */
  private compressionRatio = 20;
  /** 改变图片大小 */
  private needChangeImageSize = false;
  /** 图片最大长度 */
  private maxLength = 1024;
  /** 是否开启压缩至指定大小 */
  private compressToSpecifiedSize = false;
  /** 将图片压缩至该大小 单位b */
  private compressSpecifiedSize = 500 * 1024;
  /** 压缩精度 */
  private accuracy = 0.95;
  constructor(config = {}) {
    Object.assign(
      this,
      {
        toCompress: true,
        compressMaxSize: 2048 * 1024,
        compressionRatio: 20,
        needChangeImageSize: false,
        maxLength: 1024,
        compressToSpecifiedSize: false,
        compressSpecifiedSize: 500 * 1024,
        accuracy: 0.95
      },
      config
    );
    this.compress = this.compress.bind(this);
    this.getChangedImageSize = this.getChangedImageSize.bind(this);
  }

  /**
   * 将图片转化为dataUrl base64 并判断图片旋转方向
   * @param {File} file文件
   */
  transformFileToDataUrl(
    file: Blob
  ): Promise<{ dataUrl: string; orientation: number }> {
    return new Promise((resolve) => {
      let orientation;
      // 封装好的函数
      const reader = new FileReader();

      reader.readAsDataURL(file);
      // 这是个回调过程 不是同步的
      reader.onload = function (e) {
        const dataUrl = e.target?.result;
        // 获取图片旋转方向
        // @ts-ignore

        EXIF.getData(file, function () {
          // @ts-ignore
          // eslint-disable-next-line no-invalid-this
          EXIF.getAllTags(this);
          // @ts-ignore
          // eslint-disable-next-line no-invalid-this
          orientation = EXIF.getTag(this, 'Orientation');
          // @ts-ignore
          resolve({ dataUrl, orientation });
        });
      };
    });
  }

  /**
   * 压缩图片
   * @param {File} data file文件
   * @returns {File} 压缩后的图片
   */
  async compress(file: File) {
    const {
      compressionRatio,
      toCompress,
      compressMaxSize,
      compressToSpecifiedSize,
      compressSpecifiedSize,
      accuracy
    } = this;
    // 将图片转为dataUrl
    const { dataUrl, orientation } = await this.transformFileToDataUrl(file);
    // 等待图片加载完成
    const image = await this.dataURLtoImage(dataUrl);
    // 获取画布宽高
    const { drawWidth, drawHeight } = this.getChangedImageSize(
      image.width,
      image.height
    );
    // 得到canvas对象
    const canvas = this.imageToCanvas(
      image,
      drawWidth,
      drawHeight,
      orientation
    );
    // 压缩后的base64字符串
    let compressedDataUrl;
    // 按比例压缩图片

    if (toCompress && file.size > compressMaxSize && !compressToSpecifiedSize) {
      compressedDataUrl = this.canvastoDataURL(
        canvas,
        compressionRatio / 100,
        file.type
      );
      // 按照固定尺寸压缩图片
    } else if (
      toCompress &&
      file.size > compressSpecifiedSize &&
      compressToSpecifiedSize
    ) {
      compressedDataUrl = this.compressAccurately(
        canvas,
        {
          accuracy,
          size: compressSpecifiedSize
        },
        file.type,
        file.size
      ) || '';
      // 不压缩图片
    } else {
      compressedDataUrl = this.canvastoDataURL(canvas, 1, file.type) || '';
    }
    const compressedFile = this.processData(compressedDataUrl, file.name);
    // console.log("compressedFile", compressedFile);

    return compressedFile.size > file.size ? file : compressedFile;
    // return {
    //   file: compressedFile.size > file.size ? file : compressedFile,
    //   compressedDataUrl
    // };
  }

  /**
   * 将canvas转为base64
   * @param canvas -canvas 对象
   * @param quality - 图片质量
   * @param type - 图片类型
   */
  canvastoDataURL(canvas: HTMLCanvasElement, quality: number, type: string) {
    // 当图片格式为 png 时，有些图片压缩后的大小会有问题，故将其格式强制识别为 jpeg 格式
    return canvas.toDataURL(
      type.toLowerCase().indexOf('png') > -1 ? 'image/jpeg' : type,
      quality
    );
  }

  /**
   * 压缩至指定大小
   */
  compressAccurately(
    canvas: HTMLCanvasElement,
    config: { accuracy?: number; size?: number } = {},
    mime: string,
    originalSize?: number
  ) {
    if (!config.accuracy || config.accuracy < 0.8 || config.accuracy > 0.99) {
      config.accuracy = 0.95; // 默认精度0.95
    }
    const resultSize = {
      max: (config.size || this.compressSpecifiedSize) * (2 - config.accuracy),
      accurate: config.size || this.compressSpecifiedSize,
      min: (config.size || this.compressSpecifiedSize) * config.accuracy
    };
    /**
     * 经过测试发现，blob.size与dataURL.length的比值约等于0.75
     * 这个比值可以同过dataURLtoFile这个方法来测试验证
     * 这里为了提高性能，直接通过这个比值来计算出blob.size
     */
    const proportion = 0.75;
    let imageQuality = 0.5;
    let compressDataURL;
    const tempDataURLs = ['', ''];
    /**
     * HTMLCanvasElement.toBlob()以及 HTMLCanvasElement.toDataURL() 压缩参数
     * 的最小细粒度为0.01，而2的7次方为128，即只要循环7次，则会覆盖所有可能性
     */

    for (let x = 1; x <= 7; x++) {
      compressDataURL = this.canvastoDataURL(canvas, imageQuality, mime);
      const CalculationSize = compressDataURL.length * proportion;
      // console.group();
      // console.log("循环次数：", x);
      // console.log("原始大小", originalSize);
      // console.log("当前图片质量", imageQuality);
      // console.log("当前图片尺寸", CalculationSize);
      // console.log("当前压缩率", CalculationSize / originalSize);
      // console.log("与目标体积偏差", CalculationSize / (config.size * 1024) - 1);
      // console.groupEnd();

      /**
       * 如果到循环第七次还没有达到精确度的值，那说明该图片不能达到到此精确度要求
       * 这时候最后一次循环出来的dataURL可能不是最精确的，需要取其周边两个dataURL三者比较来选出最精确的；
       */
      if (x === 7) {
        if (
          resultSize.max < CalculationSize ||
          resultSize.min > CalculationSize
        ) {
          compressDataURL = [compressDataURL, ...tempDataURLs]
            .filter((i) => i) // 去除null
            .sort(
              (a, b) =>
                Math.abs(a.length * proportion - resultSize.accurate) -
                Math.abs(b.length * proportion - resultSize.accurate)
            )[0];
        }
        break;
      }
      if (resultSize.max < CalculationSize) {
        tempDataURLs[1] = compressDataURL;
        imageQuality -= 0.5 ** (x + 1);
      } else if (resultSize.min > CalculationSize) {
        tempDataURLs[0] = compressDataURL;
        imageQuality += 0.5 ** (x + 1);
      } else {
        break;
      }
    }
    return compressDataURL;
  }

  /**
   * 将base64数据转为文件
   * @description 为了兼容性 处理数据
   * @param dataURL base64字符串
   * @param fileName 文件名称
   */
  processData(dataURL: string, fileName: string) {
    const dataArr = dataURL.split(',');
    const arrMatch = dataArr[0].match(/:(.*?);/);
    const fileType = arrMatch && arrMatch[1] || '';
    const binaryString = window.atob(dataArr[1]);
    const binaryStringLength = binaryString.length;
    const arrayBuffer = new ArrayBuffer(binaryStringLength);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryStringLength; i++) {
      intArray[i] = binaryString.charCodeAt(i);
    }
    const fileData = [intArray];
    let blob;

    try {
      blob = new Blob(fileData, { type: fileType });
    } catch (error) {
      window.BlobBuilder =
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder;
      if (error.name === 'TypeError' && window.BlobBuilder) {
        const builder = new window.BlobBuilder();

        builder.append(arrayBuffer);
        blob = builder.getBlob(fileType);
      } else {
        throw new Error('版本过低，不支持上传图片');
      }
    }

    // blob 转file
    return new File([blob], fileName, { type: fileType });
  }

  /**
   * 将一个image对象转变为一个canvas对象
   * @param image
   * @param width - canvas图像的宽度，默认为image的宽度
   * @param height - canvas图像的高度，默认为image的高度
   * @param orientation - 图片旋转参数，默认不旋转，参考如下：
   * 	 参数	 旋转方向
   * 	 1		0°
   * 	 2		水平翻转
   * 	 3		180°
   * 	 4		垂直翻转
   * 	 5		顺时针90°+水平翻转
   * 	 6		顺时针90°
   *   7		顺时针90°+垂直翻转
   * 	 8		逆时针90°
   * @returns {Element.canvas}
   */
  imageToCanvas(
    image: HTMLImageElement,
    width: number,
    height: number,
    orientation: number
  ) {
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    // 当顺时针或者逆时针旋转90时，需要交换canvas的宽高

    if ([5, 6, 7, 8].some((i) => i === orientation)) {
      cvs.height = width;
      cvs.width = height;
    } else {
      cvs.height = height;
      cvs.width = width;
    }
    if (ctx) {
      // 填充白色背景
      ctx.fillStyle = '#ffffff';
      // 设置方向
      switch (orientation) {
        case 2:
          ctx.translate(cvs.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
          break;
        case 3:
          ctx.rotate(180 * Math.PI / 180);
          ctx.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height);
          break;
        case 4:
          ctx.translate(cvs.width, 0);
          ctx.scale(-1, 1);
          ctx.rotate(180 * Math.PI / 180);
          ctx.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height);
          break;
        case 5:
          ctx.translate(cvs.width, 0);
          ctx.scale(-1, 1);
          ctx.rotate(90 * Math.PI / 180);
          ctx.drawImage(image, 0, -cvs.width, cvs.height, cvs.width);
          break;
        case 6:
          ctx.rotate(90 * Math.PI / 180);
          ctx.drawImage(image, 0, -cvs.width, cvs.height, cvs.width);
          break;
        case 7:
          ctx.translate(cvs.width, 0);
          ctx.scale(-1, 1);
          ctx.rotate(270 * Math.PI / 180);
          ctx.drawImage(image, -cvs.height, 0, cvs.height, cvs.width);
          break;
        case 8:
          ctx.rotate(270 * Math.PI / 180);
          ctx.drawImage(image, -cvs.height, 0, cvs.height, cvs.width);
          break;
        default:
          ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
          break;
      }
    }

    return cvs;
  }

  /**
   * 将dataURL字符串转变为image对象
   * @param {srting} dataURL - dataURL字符串
   * @returns {Promise(Image)}
   */
  dataURLtoImage(dataURL: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.src = dataURL;
      img.onload = () => {
        /**
         * 在 sarfi 浏览器中出现黑图现象 CUACELL-15219
         * 经排查确认：
         * 1. 在 base64URL 转 canvas 时图片便已经损坏
         * 2. 可以获得图片的尺寸信息 即宽、高数据
         *  ** 怀疑在转成 canvas 图像之前 base64数据未在内存中完全写入，导致图片呈损坏现象
         * 以上仅是个人怀疑，在网上并无类似问题
         * 故使用一个延时方法，确保 "base64数据可完全加载"
         * 经测试有效
         */
        setTimeout(() => {
          resolve(img);
        }, 1000);
      };
      img.onerror = () => {
        reject(new Error('dataURLtoImage(): dataURL is illegal'));
      };
    });
  }

  /**
   * 改变图片大小
   * @param naturalWidth 原图宽度
   * @param naturalHeight 原图高度
   */
  getChangedImageSize(
    naturalWidth: number,
    naturalHeight: number
  ): {
    /** 转换后图片的宽度 */
    drawWidth: number;
    /** 转换后图片的高度 */
    drawHeight: number;
  } {
    const { maxLength, needChangeImageSize } = this;

    if (!needChangeImageSize) {
      return {
        drawWidth: naturalWidth,
        drawHeight: naturalHeight
      };
    }
    let drawWidth = naturalWidth;
    let drawHeight = naturalHeight;
    // 改变一下图片大小
    let maxSide = Math.max(drawWidth, drawHeight);

    if (maxSide > maxLength) {
      let minSide = Math.min(drawWidth, drawHeight);

      minSide = minSide / maxSide * 1024;
      maxSide = 1024;
      if (drawWidth > drawHeight) {
        drawWidth = maxSide;
        drawHeight = minSide;
      } else {
        drawWidth = minSide;
        drawHeight = maxSide;
      }
    }
    return {
      drawWidth,
      drawHeight
    };
  }
}
