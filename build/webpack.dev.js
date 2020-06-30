const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8200,
    historyApiFallback: true,
    overlay: {//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
      errors: true
    },
    inline: true,
    hot: true,
    // proxy: {
    //   '/api/v1': {
    //     target: '',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api/v1': '/api/v1'
    //     }
    //   }
    // }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "eslint-loader",
          options: {
            enforce: "pre", //强制之前执行
          },
        },
      },
      {
        test: /\.css$/, // 正则匹配文件路径
        exclude: /node_modules/,
        use: [
          // 注意loader生效是从下往上的
          "style-loader",
          "css-loader",
        ],
      },
      {
        // for ant design
        test: /\.less$/,
        include: path.resolve('../node_modules'),
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                // modifyVars: theme,
                javascriptEnabled: true,
              },
            }
          }
        ]
       },
    
      {
        test: /\.scss$/,
        include: path.join(__dirname, "../src"), // 只让loader解析我们src底下自己写的文件
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              // 应换成下面的
              sassOptions: {
                includePaths: [path.join(__dirname, "../src/styles")],
              },
            },
          },
        ],
      },
    ],
  },
}

module.exports = merge(baseConfig, devConfig)
