const path = require("path")
const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const postcssPresetEnv = require("postcss-preset-env")

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          {
            loader: "babel-loader",
          },
        ],
        // 排除node_modules底下的
        exclude: /node_modules/,
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
            // include: resolve("../src"),
            options: {
              // 这个在最新的scss版本中已经不能用了2020-01-05更新，额其实一两个月前就不能这样写了
              // includePaths: [path.join(__dirname, '../src/styles')]
              // 应换成下面的
              sassOptions: {
                includePaths: [path.join(__dirname, "../src/styles")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              //1024 == 1kb
              //小于10kb时打包成base64编码的图片否则单独打包成图片
              limit: 10240,
              name: path.join("img/[name].[hash:7].[ext]"),
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              name: path.join("font/[name].[hash:7].[ext]"),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      '@': resolve('../src'),
      "@ant-design/icons/lib/dist$": resolve('../src/icons.ts'),
      '@components': resolve('../src/components'),
      '@img': resolve('../src/assets/img')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      inject: true,
    }),
    // postcssPresetEnv(),
  ],
  devServer: {
    host: "localhost",
    port: 3000,
    historyApiFallback: true,
    overlay: {
      //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
      errors: true,
    },
    inline: true,
    hot: true,
  },
 

}
