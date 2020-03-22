import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    patients: [],
    bloodTests: [],
    blood_pressure: [],
    bodyMeasurements: [],
    questionnaires: [],

  },
  mutations: {
    increment (state) {
      state.count++
    },
    addPatients (state, patients) {
      state.patients = patients;
    },
    addBP (state, bloodPressure) {
      state.blood_pressure.push(bloodPressure)
    },
    addBloodTests(state, bloodTest) {
      let index = state.bloodTests.findIndex(function(item, i) {
        return item.body.data.name === bloodTest.body.data.name;
      });
      if (index != -1) {
        state.bloodTests = [
          ...state.bloodTests.slice(0, index),
          bloodTest,
          ...state.bloodTests.slice(index + 1)
        ]
      } else {
        state.bloodTests.push(bloodTest)
      }
    },
    addBodyMeasurement(state, measurement) {

      let index = state.bodyMeasurements.findIndex(function(item, i) {
        return item.body.data.name === measurement.body.data.name;
      });
      if (index != -1) {
        state.bodyMeasurements = [
          ...state.bodyMeasurements.slice(0, index),
          measurement,
          ...state.bodyMeasurements.slice(index + 1)
        ]
      } else {
        state.bodyMeasurements.push(measurement)
      }
    },

    addQuestionnaire(state, questionnaire) {
      let index = state.questionnaires.findIndex(function(item, i) {
        return item.body.data.name === questionnaire.body.data.name;
      });
      if (index !== -1) {
        state.questionnaires = [
          ...state.questionnaires.slice(0, index),
          questionnaire,
          ...state.questionnaires.slice(index + 1)
        ]
      } else {
        state.questionnaires.push(questionnaire)
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
    },
    getBodyMeasurement: state => {
      return state.bodyMeasurements
    },
    getQuestionnaire: state => {
      return state.questionnaires
    }
  },
  actions: {
    addBloodTest({ commit },bloodTest) {
      commit('addBloodTests', bloodTest)
    },
    addBloodPressure({ commit }, bloodPressure) {
      console.log(bloodPressure,'ob')
      commit('addBP', bloodPressure)
    },
    addBodyMeasurements({ commit }, measurement) {
      commit('addBodyMeasurement', measurement)
    },
    addQuestionnaire({ commit }, questionnaire) {
      commit('addQuestionnaire', questionnaire)
    }
  },
  modules: {
    auth
  }
})
