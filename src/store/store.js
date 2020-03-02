import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    patients: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addPatients (state, patients) {
      state.patients = patients;
    }
  },
  getters: {
    getPatients: state => {
      return state.patients;
    }
  },
  actions: {

  },
  modules: {
    auth
  }
})
