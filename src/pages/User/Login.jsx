import React, { useState } from 'react';
import * as S from './User.styled.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from '../../apis/user.js';
import { setUserInfo } from 'redux/modules/authSlice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const isButtonActive = id && password;

  // 로그인 진행
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await API.post('/login', { id, password });
      const userInfo = response.data;
      dispatch(setUserInfo(userInfo));
      // 토큰의 만료 시간 설정 (예: 현재 시간 + 1시간) -> 60000은 1분
      const expirationTime = new Date().getTime() + 3600000;
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
        <S.USER_TITLE>NEW JEANS</S.USER_TITLE>
        <form>
          <div>
            <S.INPUT type="text" placeholder="아이디" required onChange={e => setId(e.target.value)} />
          </div>
          <div>
            <S.INPUT type="password" placeholder="비밀번호" required onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <S.USER_BUTTON onClick={handleLogin} disabled={!isButtonActive} $active={isButtonActive}>
              로그인
            </S.USER_BUTTON>
          </div>
        </form>
        <S.CAPTION onClick={() => navigate('/signup')}>회원가입</S.CAPTION>
      </S.USER_CONTAINER>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default Login;
