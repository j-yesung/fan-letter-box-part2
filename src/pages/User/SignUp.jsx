import React from 'react';
import * as S from './User.styled';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <>
      <S.USER_CONTAINER>
        <S.USER_TITLE>회원가입</S.USER_TITLE>
        <form>
          <div>
            <S.INPUT type="text" placeholder="아이디" required />
          </div>
          <div>
            <S.INPUT type="password" placeholder="비밀번호" required />
          </div>
          <div>
            <S.INPUT type="text" placeholder="닉네임" required />
          </div>
          <div>
            <S.USER_BUTTON>회원가입</S.USER_BUTTON>
          </div>
        </form>
        <S.CAPTION onClick={() => navigate('/login')}>로그인</S.CAPTION>
      </S.USER_CONTAINER>
    </>
  );
};

export default SignUp;
