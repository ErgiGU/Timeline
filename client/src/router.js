import Vue from 'vue'
import Router from 'vue-router'
import ExampleHome from './views/ExampleHome.vue'
import Registration from './views/Home-reg.vue'
import Login from './views/Login.vue'
import Home from "@/views/Home";
import InitialHome from "./views/Initial-home";

Vue.use(Router)

export default new Router({
  mode: 'history',
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Initial-home',
      component: InitialHome
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/ExampleHome',
      name: 'ExampleHome',
      component: ExampleHome
    },
  ]
})
