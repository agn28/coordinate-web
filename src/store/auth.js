import axios from 'axios'
export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  getters: {
    authenticated(state) {
      return state.token && state.user
    },
    userInfo(state) {
      return state.user
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, data) {
      state.user = data
    }
  },
  actions: {
    async signIn({ dispatch },data) {
      console.log(process.env);
      let response = await axios.post(process.env.VUE_APP_API + '/users/login', data);
      return dispatch('commit',response.data)

    },
    async commit({ commit }, data) {
      commit('SET_TOKEN', data.accessToken)
      commit('SET_USER', data)
    },
    removeCommit({commit}) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    },
    signOut({ dispatch }) {
      // return axios.post('http://a753d198.ngrok.io/api/v1/users/logout').then(() => {
      return dispatch('removeCommit')
      // })
    }
  },

}
