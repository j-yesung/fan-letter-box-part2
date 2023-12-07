import axios from 'axios';

const LETTER_INSTANCE = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // timeout: 3000, // milliseconds 기준, 해당 시간까지 응답 없으면 요청 오류로 보내버림.
});

LETTER_INSTANCE.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log('🚀 ~ 인터셉터 요청 오류', error);
    return Promise.reject(error);
  },
);

LETTER_INSTANCE.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('🚀 ~ 응답이... 공습 경보! ', error);
    return Promise.reject(error);
  },
);

export default LETTER_INSTANCE;
