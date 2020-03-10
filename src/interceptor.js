import axios from "axios";
import store from "./store/store";
import router from "./routes/routes";
const http = axios.create ({
  baseURL: process.env.VUE_APP_API,
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response && error.response.status == 401) {
    store.dispatch('auth/logout')
    router.push('/login')
  }
  return Promise.reject(error);
});
http.interceptors.request.use (
  function (config) {
    const token = store.state.auth.user.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    console.log("Error from interceptor",error)
    return Promise.reject (error);
  }
);
export default  http;
