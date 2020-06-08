import Vue from 'vue'
import App from './App.vue'

import './assets/styles/global.less'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  // h参数为Vue的createApp
  render: (h) => h(App)
}).$mount(root)
