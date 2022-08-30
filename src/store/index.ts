import { removeStorage, setStorage, setUsername, setPermission } from '@/utils/storage'
import Vue from 'vue'
import Vuex from 'vuex'
import { login } from "../api/login"
import { getPwd } from "@/utils/common"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    projectDialog: false
  },
  mutations: {
  },
  actions: {
    Login({ commit }, option) {
      return new Promise((resolve, reject) => {
        login({ userName: option.userName.trim(), passWord: getPwd(option.passWord) }).then(response => {
          if (response.code === 0) {
            setStorage(response.data.token);
            setPermission(response.data.permissions.data)
            setUsername(option.userName)
            resolve(response)
          } else {
            resolve(response.code)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout({ commit, state, dispatch }) {
      removeStorage()
      // return new Promise((resolve, reject) => {
      //   logout()
      //     .then(response => {
      //       if (response.code === 0) {
      //         removeStorage()
      //         resolve(response)
      //       }
      //     })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
    },
  },
  modules: {
  }
})
