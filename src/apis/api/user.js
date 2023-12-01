import axios from 'axios';

const userInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_SERVER_URL,
});

userInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log('🚀 ~ 인터셉터 요청 오류', error);
    return Promise.reject(error);
  },
);

userInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('🚀 ~ 응답이... 공습 경보! ', error);
    return Promise.reject(error);
  },
);

export default userInstance;
