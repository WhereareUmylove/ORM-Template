import { getStorage, removeStorage } from '@/utils/storage'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store/index'
import router from '@/router'

const url = process.env.VUE_APP_BASE_URL
const service = axios.create({
  baseURL: url || '/api',
  timeout: 1000 * 60 * 10
})

service.interceptors.request.use(
  config => {
    store.state.loading = true
    if (getStorage()) {
      config.headers['Token'] = '' + getStorage()
    }
    if (config.params) {
      for (const key in config.params) {
        if (Object.prototype.hasOwnProperty.call(config.params, key)) {
          const element = config.params[key];
          if (element === "") {
            config.params[key] = null
          }
        }
      }
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    store.state.loading = false
    if (response.data.code === 10010002) {
      removeStorage()
      Message.error(response.data.message)
      router.push('login')
    }
    if (response.data.code != 0) {
      Message.error(response.data.message)
    }
    return response.data
  },
  error => {
    store.state.loading = false
    Message.error(error.message)
    Promise.reject(error)
  }
)
service['$post'] = function (url, params, h) {
  return service.post(url, params, {
    headers: {
      'Content-Type': 'application/json',
      ...h
    }
  })
}
export default service
