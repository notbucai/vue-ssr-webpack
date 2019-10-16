const createApp = require("../server/core/createVm");

function onReady(router) {
  return new Promise((resolve, reject) => {
    router.onReady(() => {

      let matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        return reject(new Error('matchedComponents zero'));
      }
      resolve();
    }, reject)
  });
}

module.exports = async (context) => {
  let { url } = context;

  let { app, router } = createApp(context);

  await router.push(url)

  //  router回调函数
  //  当所有异步请求完成之后就会触发

  await onReady(router);

  return app;
}