import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    patients: [],
    bloodTests: [],
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addPatients (state, patients) {
      state.patients = patients;
    },
    addBloodTests(state, bloodTest) {
      console.log(state.bloodTests)
      state.bloodTests.push(bloodTest)
      console.log(state.bloodTests)
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
