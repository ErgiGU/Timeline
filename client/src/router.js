import Vue from 'vue'
import Router from 'vue-router'
import Registration from './views/Home-reg.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
