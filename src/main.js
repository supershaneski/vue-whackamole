import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Global variables
Vue.prototype.$DEFAULT_TIME = 60
Vue.prototype.$DEFAULT_SIZE = 75
Vue.prototype.$DEFAULT_INTERVAL = 900

new Vue({
  render: h => h(App),
}).$mount('#app')
