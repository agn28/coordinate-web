import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes/routes';
import axios from 'axios'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)
Vue.use(VueRouter)

axios.defaults.baseURL = 'https://fhirapi.monarko.com';  
// axios.defaults.baseURL = 'http://127.0.0.1:3000';
// axios.defaults.baseURL = 'http://c82e0024.ngrok.io/';

Vue.prototype.$http = axios;
Vue.prototype.moment = moment;

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
