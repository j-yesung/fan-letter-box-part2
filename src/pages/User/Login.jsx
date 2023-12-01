import React, { useRef } from 'react';
import * as S from './User.styled.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from '../../apis/api/user';
import { setAccessToken } from 'redux/modules/authSlice.js';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const idRef = useRef(null);
  const pwRef = useRef(null);

  // 로그인 진행
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const RESPONSE = await API.post('/login', { id: idRef.current.value, password: pwRef.current.value });
      const ACCESS_TOKEN = RESPONSE.data.accessToken;
      dispatch(setAccessToken(ACCESS_TOKEN));
      localStorage.setItem('ACCESS_TOKEN', ACCESS_TOKEN);
      navigate('/home');
    } catch (err) {
      console.error('로그인 실패', err.message);
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
    </>
  );
};

export default Login;
