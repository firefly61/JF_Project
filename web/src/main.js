import Vue from 'vue';
import VueRouter from 'vue-router';
import echarts from 'echarts';

import App from './App.vue';
import vants from './vant.js';
import router from './routing';

import './service/axios';


Vue.config.productionTip = false;
Vue.use(VueRouter);

vants.forEach((item) => {
  Vue.use(item);
})

Vue.prototype.$echarts = echarts;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
