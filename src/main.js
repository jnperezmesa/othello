import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueClipboard from 'vue-clipboard2'


Vue.use(VueClipboard)


Vue.config.productionTip = false

// Aquí lo que tenga que ejecutarse al inicio

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
