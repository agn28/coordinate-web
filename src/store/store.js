import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    patients: [],
    bloodTests: [],
    blood_pressure: {}
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addPatients (state, patients) {
      state.patients = patients;
    },
    addBP (state, bloodPressure) {
      state.blood_pressure = bloodPressure
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
    getBloodPressure: state => {
      return state.blood_pressure
    }
  },
  actions: {
    addBloodTest({ commit },bloodTest) {
      commit('addBloodTests', bloodTest)
    },
    addBloodPressure({ commit }, bloodPressure) {
      commit('addBP', bloodPressure)
    }
  },
  modules: {
    auth
  }
})
