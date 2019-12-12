import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
// import { userInfo } from './api'
import {
  Button,
  Pagination,
  Checkbox,
  Icon,
  Autocomplete,
  Loading,
  Message,
  Notification,
  Steps,
  Step,
  Table,
  TableColumn,
  Input,
  Dialog,
  Select,
  Option
} from 'element-ui'
// import {getStore} from '/utils/storage'
import VueContentPlaceholders from 'vue-content-placeholders'
import {getStore} from '/utils/storage'

Vue.use(VueContentPlaceholders)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Autocomplete)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false
const whiteList = ['/home', '/goods', '/login', '/register', '/goodsDetails', '/thanks', '/search', '/refreshsearch', '/refreshgoods', '/cart'] // , '/checkout', '/order', '/payment', '/order/payment'] // 不需要登陆的页面
// 全局前置守卫,验证是否登录
router.beforeEach(function (to, from, next) {
  // TODO 这里需要添加权限控制的代码
  console.log(getStore('login'))
  console.log(getStore('userInfo'))
  if (!getStore('login')) { // 没登录
    console.log('come to nologin')
    if (whiteList.indexOf(to.path) !== -1) { // 白名单
      next()
    } else {
      next('/login')
    }
  } else { //  登录了
    if (to.path === '/login') { //  登录了还访问login，sb？ 跳转到首页吧
      next({path: '/'})
    }
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
