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
      let index = state.bloodTests.findIndex(function(item, i) {
        return item.name === bloodTest.name;
      });
      if (index === -1) {
        state.bloodTests = [
          ...state.bloodTests.slice(0, index),
          bloodTest,
          ...state.bloodTests.slice(index + 1)
        ]
      } else {
        state.bloodTests.push(bloodTest)
      }
    }
  },
  getters: {
    getPatients: state => {
      return state.patients;
    },
    getBloodTests: state => {
      return state.bloodTests
    },
  },
  actions: {
    addBloodTest({ commit },bloodTest) {
      commit('addBloodTests', bloodTest)
    }
  },
  modules: {
    auth
  }
})
