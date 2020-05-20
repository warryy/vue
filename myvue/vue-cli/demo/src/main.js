import Vue from 'vue'
import App from './App.vue'

import create from '@/util/create.js'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$create = create;

window.rres;

window.yy = new Vue({
  router,
  render: h => window.rres = h(App)
});

window.yy.$mount('#app')