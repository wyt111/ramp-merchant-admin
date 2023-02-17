import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage,
    reducer(val) {
      return {
        // 需要储存的数据
        user: val.user,
        getters: val.getters,
        settings: val.settings,
        app: val.app

      }
    }
  })],
  modules: {
    app,
    settings,
    user
  },
  getters

})

export default store

