import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppHome',
      component: () => import(/* webpackChunkName: "home" */ './components/AppHome.vue')
    },
    {
      path: '/about',
      name: 'AppAbout',
      component: () => import(/* webpackChunkName: "home" */ './components/AppAbout.vue')
    }
  ]
})
