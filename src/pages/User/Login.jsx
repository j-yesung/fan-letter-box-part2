import React from 'react';
import * as S from './User.styled.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  /**
   * TODO : JWT token 로그인 진행
   */
  const handleLogin = () => {};

  return (
    <>
      <S.USER_CONTAINER>
        <S.USER_TITLE>로그인</S.USER_TITLE>
        <form>
          <div>
            <S.INPUT type="text" placeholder="아이디" required />
          </div>
          <div>
            <S.INPUT type="password" placeholder="비밀번호" required />
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
