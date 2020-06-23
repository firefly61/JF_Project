import Vue from 'vue';
import VueRouter from 'vue-router';
import echarts from 'echarts';
import VueTouch from 'vue-touch';

import App from './App.vue';
import vants from './vant.js';
import router from './routing';

import './service/axios';

import './styles/common.scss'


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueTouch, {name: 'v-touch'});

VueTouch.config.swipe = {
  threshold: 100
}

vants.forEach((item) => {
  Vue.use(item);
})

Vue.prototype.$echarts = echarts;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
