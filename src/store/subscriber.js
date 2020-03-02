import store from "./store";
import axios from 'axios';

store.subscribe((mutation => {
  switch (mutation.type) {
    case 'auth/SET_USER' :
      if (mutation.payload) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload.accessToken}`
        localStorage.setItem('token', mutation.payload.accessToken)
        localStorage.setItem('user', JSON.stringify(mutation.payload))
      } else {
        axios.defaults.headers.common['Authorization'] = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
      break
  }
}))
