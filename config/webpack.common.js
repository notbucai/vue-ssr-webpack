/*
 * @Author: bucai
 * @Date: 2019-10-14 19:55:41
 * @LastEditors: bucai
 * @LastEditTime: 2019-10-17 14:27:22
 * @Description: webpack config common
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueServerPlugin = require("vue-server-renderer/server-plugin");
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  target: 'node',
  mode: 'development',
  devtool:"source-map",
  entry: ['./src/entry-server.js'],
  output: {
    filename: 'main.js',
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      }
    ]
  },
  plugins: [
    new VueServerPlugin(),
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../public/index.html')
    // })
  ]
};

