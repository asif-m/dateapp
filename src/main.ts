import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import DateFormatFilter from './filters/datetimeformatfilter';

Vue.use(Vuetify);
Vue.config.productionTip = false;

Vue.filter('formatDate', DateFormatFilter.formatDate);
Vue.filter('formatDateTime', DateFormatFilter.formatDateTime);
Vue.filter('formatDateTime12Hrs', DateFormatFilter.formatDateTime12Hrs);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
