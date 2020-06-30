const merge = require('webpack-merge')
const path = require("path")
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin")
const webpack = require('webpack')

const prodConfig = {
  mode: 'production',
  // devtool: 'source-map',
  optimization: { // 性能配置
    // ...
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'), // 使用 cssnano 压缩器
        cssProcessorOptions: {
          reduceIdents: false,
          autoprefixer: false,
          safe: true,
          discardComments: {
            removeAll: true
          }
        }
      }),
      new TerserPlugin({
        cache: true,
        // parallel: true,
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'] // 移除console
          }
        },
        sourceMap: true
      }),
      // 告诉 Webpack 使用了哪些动态链接库
      new webpack.DllReferencePlugin({
        manifest: path.join(__dirname, `../dll/vendor.manifest.json`)
      })
    ],
    splitChunks: {
      chunks: 'async', // 提取的 chunk 类型，all: 所有，async: 异步，initial: 初始
      // minSize: 30000, // 默认值，新 chunk 产生的最小限制 整数类型（以字节为单位）
      // maxSize: 0, // 默认值，新 chunk 产生的最大限制，0为无限 整数类型（以字节为单位）
      // minChunks: 1, // 默认值，新 chunk 被引用的最少次数
      // maxAsyncRequests: 5, // 默认值，按需加载的 chunk，最大数量
      // maxInitialRequests: 3, // 默认值，初始加载的 chunk，最大数量
      // name: true, // 默认值，控制 chunk 的命名
      cacheGroups: { // 配置缓存组
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: 10, // 优先级
          reuseExistingChunk: false, // 允许复用已经存在的代码块
          test: /node_modules\/(.*)\.js/, // 只打包初始时依赖的第三方
        },
        common: {
          name: 'common',
          chunks: 'initial',
          // test: resolve("src/components"), // 可自定义拓展你的规则
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      minify: {
        removeComments: true, // 去掉注释
        collapseWhitespace: true, // 去掉多余空白
        removeAttributeQuotes: true // 去掉一些属性的引号，例如id="moo" => id=moo
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[id].[contenthash].css'
    }),
    // 注意一定要在HtmlWebpackPlugin之后引用
    // inline 的name 和你 runtimeChunk 的 name保持一致
    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配文件路径
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          "css-loader",
        ],
      },
      {
        // for ant design
        test: /\.less$/,
        include: path.resolve('../node_modules'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
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
    ]
  },
}
module.exports = merge(baseConfig, prodConfig)
