const webpack = require('webpack');
const Koa = require('koa');
const path = require('path');
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8')
})
// const koaWebpack = require('koa-webpack');
// const compiler = webpack(require('../config/webpack.common'));

const serverEntry = require('../src/entry-server')

async function init() {
  const app = new Koa();
  // const webpackMiddleware = await koaWebpack({ compiler });

  // app.use(webpackMiddleware); 
  app.use(async (ctx, next) => {
    
    try {
      const vm = await serverEntry(ctx); 

      const html = await renderer.renderToString(vm);
      ctx.body = html;

    } catch (error) {
      ctx.body = 404;
    }

  });

  app.listen(3425, '0.0.0.0', function () {
    console.log('http://0.0.0.0:3425/');
  });
}

init();