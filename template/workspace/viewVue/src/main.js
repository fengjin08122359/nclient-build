import '@babel/polyfill'
import promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css';
import 'font-awesome/css/font-awesome.min.css';
import 'animate.css';
import './assets/css/index.css'
promise.polyfill()
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
