import { createStore } from 'vuex'
import tab from './tab'
import user from './user'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: { //模块
    tab,
    user
  }
})
