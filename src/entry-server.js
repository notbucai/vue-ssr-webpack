import createApp from '../server/core/createVm';

function onReady(router) {
  return new Promise((resolve, reject) => {
    router.onReady(() => {
      // 获取当前路由匹配的路由组件数组
      let matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        // 如果为空表示没有这个路由
        return reject(({
          code: 404,
          msg: 'No matches found'
        }));
      }
      resolve();
    }, reject);
  });
}

export default async (context) => {
  let { url } = context;

  let { app, router } = createApp(context);
  // 将当前路由放入栈中
  await router.push(url);
  //  router回调函数
  //  当所有异步请求完成之后就会触发
  await onReady(router);

  return app;
}