import Vue from 'vue'
import Vuex from './yvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  },
  mutations: {
    add(state, payload) {
      state.count += payload || 1;
    }
  },
  actions: {
    asyncAdd(context, payload) {
      setTimeout(() => {
        context.commit('add', payload)
      }, 1000);
    }
  },
  modules: {
  }
})
