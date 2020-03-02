import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes/routes';
import axios from 'axios'
import Vuex from 'vuex'
import moment from 'moment'
import { VuejsDatatableFactory } from 'vuejs-datatable';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueFormWizard from 'vue-form-wizard'
import { MultiSelectPlugin } from '@syncfusion/ej2-vue-dropdowns';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import store from "./store/store";
require ('@/store/subscriber')


Vue.use( VuejsDatatableFactory );
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFormWizard)
Vue.use(MultiSelectPlugin);

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

if (localStorage.getItem('user')) {
  store.dispatch('auth/commit', JSON.parse(localStorage.getItem('user')))
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
