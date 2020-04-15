import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router  from './routes/routes';
import Vuex from 'vuex'
import moment from 'moment'
import { VuejsDatatableFactory } from 'vuejs-datatable';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueFormWizard from 'vue-form-wizard'
import { MultiSelectPlugin } from '@syncfusion/ej2-vue-dropdowns';
import datePicker from 'vue-bootstrap-datetimepicker';
import Loading from 'vue-loading-overlay';
import VeeValidate from "vee-validate";
import { Validator } from 'vee-validate';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import 'vue-loading-overlay/dist/vue-loading.css';

import store from "./store/store";
import interceptor from "./interceptor"
import UUID from 'vue-uuid';
Vue.use(UUID);
Vue.use( VuejsDatatableFactory );
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFormWizard)
Vue.use(MultiSelectPlugin);
Vue.use(datePicker);
Vue.use(VeeValidate);
Vue.use(require('vue-moment'));
Vue.use(Loading, {
  // props
  color: '#00569B'
},);


Vue.prototype.$http = interceptor;
Vue.prototype.moment = moment;
Vue.config.productionTip = false
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}
Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + parseInt(days));
  return this;
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
