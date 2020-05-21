import Vue from 'vue'
import Vuex from 'vuex'

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
    asyncAdd(state, payload) {
      setTimeout(() => {
        this.commit('add', payload)
      }, 1000);
    }
  },
  modules: {
  }
})
