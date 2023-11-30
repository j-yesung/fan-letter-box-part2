import axios from 'axios';

const USER_INSTANCE = axios.create({
  baseURL: process.env.REACT_APP_AUTH_SERVER_URL,
});

USER_INSTANCE.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log('🚀 ~ 인터셉터 요청 오류', error);
    return Promise.reject(error);
  },
);

USER_INSTANCE.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('🚀 ~ 응답이... 공습 경보! ', error);
    return Promise.reject(error);
  },
);

export default USER_INSTANCE;
