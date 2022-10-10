import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/carousel'
import 'bootstrap/js/dist/tab'
import 'marked'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.prototype.$defaultUserAccount = 'db1dd7fa-5d4b-4cb2-98b1-a2510ee1c188'

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
