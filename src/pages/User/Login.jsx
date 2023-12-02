import React, { useRef } from 'react';
import * as S from './User.styled.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from '../../apis/api/user';
import { setUserInfo } from 'redux/modules/authSlice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const idRef = useRef(null);
  const pwRef = useRef(null);

  // 로그인 진행
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await API.post('/login', { id: idRef.current.value, password: pwRef.current.value });
      const userInfo = response.data;
      dispatch(setUserInfo(userInfo));
      // 토큰의 만료 시간 설정 (예: 현재 시간 + 1시간) -> 60000은 1분
      const expirationTime = new Date().getTime() + 600000;
      // TODO : 토큰 만료 기간을 로컬에 분리 저장
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('tokenExpitationTime', JSON.stringify(expirationTime));
      toast.success(`${response.data.nickname}님 반가워요!`);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <S.USER_CONTAINER>
        <S.USER_TITLE>로그인</S.USER_TITLE>
        <form>
          <div>
            <S.INPUT ref={idRef} type="text" placeholder="아이디" required />
          </div>
          <div>
            <S.INPUT ref={pwRef} type="password" placeholder="비밀번호" required />
          </div>
          <div>
            <S.USER_BUTTON onClick={handleLogin}>로그인</S.USER_BUTTON>
          </div>
        </form>
        <S.CAPTION onClick={() => navigate('/signup')}>회원가입</S.CAPTION>
      </S.USER_CONTAINER>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default Login;
