import Vue from 'vue';
import VueRouter from 'vue-router';
import A from '../../src/A.vue'
// 实例Vue之前调用否则会有一次空白
Vue.use(VueRouter);
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

export default function createVm(context) {

  const app = new Vue({
    router,
    components: { A },
    template: '<A/>'
  });

  return {
    app, router
  }
}
