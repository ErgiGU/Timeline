import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/carousel'
import 'bootstrap/js/dist/tab'
import 'marked'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.prototype.$defaultUserAccount = '6a1c3323-c1f7-4d13-b71b-f6d222c6b4e5'

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
