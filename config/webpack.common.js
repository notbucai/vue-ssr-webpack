/*
 * @Author: bucai
 * @Date: 2019-10-14 19:55:41
 * @LastEditors: bucai
 * @LastEditTime: 2019-10-14 21:19:08
 * @Description: webpack config common
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    filename: 'main.js',
    publicPath: '/',
    path: path.resolve(__dirname, '../dist')
  },
  module:{
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
};

