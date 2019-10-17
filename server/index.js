const Koa = require('koa');
const logger = require('koa-logger');
const path = require('path');
const devServer = require('./dev-server');
const VueSR = require('vue-server-renderer');
let bundleRenderer;

devServer((serverBundle, clientBundle, template) => {
  console.log("bundleRenderer 准备");

  bundleRenderer = VueSR.createBundleRenderer(serverBundle, {
    template,
    renInNewContext: false
  });
});

async function init() {
  const app = new Koa();
  app.use(logger());
  app.use(async (ctx, next) => {

    try {
      const html = await bundleRenderer.renderToString({
        url: ctx.url
      });
      ctx.body = html;

    } catch (error) {
      ctx.status = error.code || 404;
      ctx.body = {
        code: ctx.status,
        errmsg: error.message || error.msg || error || "未知错误"
      };
    }

  });

  app.listen(3425, '0.0.0.0', function () {
    console.log('http://0.0.0.0:3425/');
  });
}

init();