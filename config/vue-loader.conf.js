'use strict'
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
