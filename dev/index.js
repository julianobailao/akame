import Vue from 'vue'
import App from './App'
import Boilerplate from './Boilerplate'
import Akame from 'akame'
import VueRouter from 'vue-router'
import router from './router'

Vue.config.performance = true

Vue.use(Akame)
Vue.use(VueRouter)

Vue.component(Boilerplate.name, Boilerplate)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
