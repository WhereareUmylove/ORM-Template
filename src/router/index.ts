import Vue from 'vue'
import VueRouter from 'vue-router'
import commonRouter from './common'
import moduleRouter from './modules'
import { getStorage } from '@/utils/storage'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false })

Vue.use(VueRouter)

const routes = [
  ...commonRouter,
  ...moduleRouter
]

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push (location:RawLocation) {
//   return originalPush.call(this, location)
// }

const router = new VueRouter({
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes,
  mode: "history",
})
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (getStorage()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
    }
  }
})
export default router

