import axios from "axios";
const getToken = () => `Token ${localStorage.getItem('token')}`;

/* Url que se consumira del api rest*/
//https://femto.live/
const API = axios.create({
  baseURL: "https://app.femto.live/",
  //baseURL: "http://51.222.13.17:8081/", //Ip del servidor
  //baseURL: "http://localhost:8000/", //locahost
  //baseURL: "http://172.16.15.122:8000/", //locahost
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