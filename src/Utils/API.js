import axios from "axios";
const getToken = () => `Token ${localStorage.getItem('token')}`;

const API = axios.create({
  baseURL: "http://10.0.82.150:8000/",
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  function (config) {
    if(localStorage.getItem('token')){
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