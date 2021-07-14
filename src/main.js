import { MultiSelectPlugin } from '@syncfusion/ej2-vue-dropdowns';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import VeeValidate from "vee-validate";
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import datePicker from 'vue-bootstrap-datetimepicker';
import VueEllipseProgress from 'vue-ellipse-progress';
import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import VueHtml2Canvas from 'vue-html2canvas';
import JsonExcel from "vue-json-excel";
import { VueCsvImport } from 'vue-csv-import';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueProgress from 'vue-progress-path';
import 'vue-progress-path/dist/vue-progress-path.css';
import VueRouter from 'vue-router';
import VueSweetalert2 from 'vue-sweetalert2';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import UUID from 'vue-uuid';
import { VuejsDatatableFactory } from 'vuejs-datatable';
import ProgressBar from 'vuejs-progress-bar';
import Vuex from 'vuex';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
import App from './App.vue';
import interceptor from "./interceptor";
import router from './routes/routes';
import store from "./store/store";
 

 

Vue.use(ProgressBar);

Vue.use(VueProgress, {
  // defaultShape: 'circle',
});
Vue.use(VueEllipseProgress);

Vue.use(VueApexCharts)
Vue.use(VueToast);
Vue.use(VueHtml2Canvas);

Vue.component('apexchart', VueApexCharts)

Vue.component("downloadExcel", JsonExcel);
Vue.component("vue-csv-import", VueCsvImport);

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
Vue.use(VueSweetalert2);


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
