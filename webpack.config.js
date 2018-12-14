const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry:'./src/index.js',// 打包入口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'boudle.js'
  }, // 出口
  resolve: { }, // 配置解析：配置别名、extensions 自动解析确定的扩展等等
  stats: {
    children: false
  },
  devServer: {
    port: 8086,
    open: true,
    compress: true,
    hot: true
  }, // 开发服务器
  module: {
    rules: [{
            test: /\.(scss|less)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader', 'less-loader']
            })
        },
        {
            test: /\.(woff2?|svg)$/,
            use: [{
                loader: 'url-loader?limit=10000&name=[name].[ext]&outputPath=fonts/'
            }]
        },
        {
            test: /\.(ttf|eot)$/,
            use: [{
                loader: 'file-loader?name=[name].[ext]&outputPath=fonts/'
            }]
        },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ],

  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/login.html',
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/index.css'), //提取单独的css
        new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
    })
  ] // 插件的配置：打包优化、资源管理和注入环境变量
}
