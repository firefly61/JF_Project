import Vue from 'vue';
import App from './App.vue';
import router from './routing';

import './service/axios'

import Element from 'element-ui';

Vue.use(Element)

import './styles/common.scss'
import './styles/fun.scss'


Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}).$mount('#app')
