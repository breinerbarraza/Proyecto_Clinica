import axios from "axios";
const getToken = () => `Token ${localStorage.getItem('user_token')}`;

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  function (config) {
    if(localStorage.getItem('user_token')){
      config.headers.common = {
        ...config.headers.common,
        authorization: getToken(),
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

export default API;
