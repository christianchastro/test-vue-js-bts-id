import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import { VueSpinners } from '@saeris/vue-spinners'
Vue.use(VueSpinners)
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const authData = localStorage.getItem("auth");
new Vue({
  store,
  router,
  validations: {},
  data: {
    auth: authData ? JSON.parse(authData) : null
  },
  render: h => h(App),
}).$mount('#app')
