import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home-reg.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/ExampleHome',
      name: 'ExampleHome',
      component: ExampleHome
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
