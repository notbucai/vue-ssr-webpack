const Vue = require('vue');
const VueRouter = require('vue-router');

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: {
        template: `<h1>this is home page</h1>`
      },
      name: "home"
    },
    {
      path: "/about",
      component: {
        template: `<h1>this is about page</h1>`
      },
      name: "about"
    }
  ]
});

module.exports = function createVm(context) {

  Vue.use(VueRouter);
  const app = new Vue({
    router,
    template: `<router-view></router-view>`
  });
  
  return {
    app, router
  }
}