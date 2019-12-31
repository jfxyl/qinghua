import Vue from 'vue'
import axios from 'axios'
import $ from 'jquery'
import App from './App'
import echarts from 'echarts'
import echartswordcloud from 'echarts-wordcloud';
import utils from './utils/index.js'
import api from './api/index.js'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$utils = utils
Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
