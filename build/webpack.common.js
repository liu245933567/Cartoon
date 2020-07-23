const path = require('path');
const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        // 排除node_modules底下的
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //1024 == 1kb
              //小于10kb时打包成base64编码的图片否则单独打包成图片
              limit: 10240,
              name: path.join('img/[name].[hash:7].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: path.join('font/[name].[hash:7].[ext]')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.vue', '.less', '.scss'],
    alias: {
      '@': resolve(__dirname, '../src'),
      '@config': resolve(__dirname, '../src/config'),
      '@utils': resolve(__dirname, '../src/utils'),
      '@redux': resolve(__dirname, '../src/redux'),
      '@store': resolve(__dirname, '../src/store'),
      '@components': resolve(__dirname, '../src/components'),
      '@services': resolve(__dirname, '../src/services'),
      '@images': resolve(__dirname, '../src/assets/images'),
      '@views': resolve(__dirname, '../src/views'),
      '@icons': resolve(__dirname, '../src/assets/icons'),
      '@styles': resolve(__dirname, '../src/styles'),
      '@regExps': resolve(__dirname, '../src/regExps'),
      '@typings': resolve(__dirname, '../src/typings')
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  performance: { // 性能提示，可以提示过大文件
    hints: 'warning', // 性能提示开关 false | "error" | "warning"
    maxAssetSize: 100000, // 生成的文件最大限制 整数类型（以字节为单位）
    maxEntrypointSize: 100000, // 引入的文件最大限制 整数类型（以字节为单位）
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename);
    }
  }
};
