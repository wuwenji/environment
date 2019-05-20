
import Vue from 'vue'
import 'babel-polyfill'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import axios from 'axios'
import overviewPage from './pages/overview'
import monitorPage from './pages/monitor'
import preventionPage from './pages/prevention'
import traceabilityPage from './pages/traceability'
import logoPage from './pages/logo'
import forecastPage from './pages/forecast'
import store from './store/store'
import seeDetail from './pages/seedetail'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.axios = axios

const routes = [
  {
    path: '/logo',
    component: logoPage,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    component: overviewPage,
    meta: {
      title: '实时概览',
      requireAuth: true
    }
  },
  {
    path: '/monitor',
    component: monitorPage,
    meta: {
      title: '监测分布',
      requireAuth: true
    }
  },
  {
    path: '/prevention',
    component: preventionPage,
    meta: {
      title: '预警处置',
      requireAuth: true
    }
  },
  {
    path: '/traceability',
    component: traceabilityPage,
    meta: {
      title: '污染溯源',
      requireAuth: true
    }
  },
  {
    path: '/seedetail',
    component: seeDetail,
    meta: {
      title: '打印预览',
      requireAuth: true
    }
  },
  {
    path: '/forecast',
    component: forecastPage,
    meta: {
      title: '预测分析',
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.token) {
      next()
    } else {
      next({
        path: '/logo',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#web',
  router,
  store
})
