import Vue from 'vue'
import Router from 'vue-router'
import Registration from './views/Home-reg.vue'
import Login from './views/Login.vue'

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
      name: 'login',
      component: Login
    },
    {
      path: '/Registration',
      name: 'registration',
      component: Registration
    }
  ]
})
