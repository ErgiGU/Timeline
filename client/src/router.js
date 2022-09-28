import Vue from 'vue'
import Router from 'vue-router'
import ExampleHome from './views/ExampleHome.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ExampleHome',
      component: ExampleHome
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    }
  ]
})
