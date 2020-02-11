import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
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
  }
})
