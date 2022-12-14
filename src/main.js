import Vue from 'vue'
import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

//import router
import router from './router'
import axios from 'axios';

//import vuetify
import vuetify from "@/plugins/vuetify";

//import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://127.0.0.1:8000/api';

new Vue({
  vuetify,
  router,
  // store: store,
  render: h => h(App),
}).$mount('#app')