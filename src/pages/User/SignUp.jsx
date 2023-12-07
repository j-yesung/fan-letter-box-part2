import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../apis/user';
import * as S from './User.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const isButtonActive = id && password && nickname;

  // 회원가입 진행
  const handleSignUp = async e => {
    e.preventDefault();

    try {
      const response = await API.post('/register', { id, password, nickname });
      toast.success(`${response.data.message}`);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      console.log(error.response.data.message);
    }
  };

  // TODO : 로그인 실패 시 에러 핸들링 => error message로?? request 날려보자.

  return (
    <>
      <S.USER_CONTAINER>
        <S.USER_TITLE>NEW JEANS</S.USER_TITLE>
        <form>
          <div>
            <S.INPUT
              type="text"
              minLength={4}
              maxLength={10}
              placeholder="아이디"
              required
              onChange={e => setId(e.target.value)}
            />
          </div>
          <div>
            <S.INPUT
              type="password"
              minLength={4}
              maxLength={15}
              placeholder="비밀번호"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <S.INPUT
              type="text"
              minLength={1}
              maxLength={10}
              placeholder="닉네임"
              required
              onChange={e => setNickname(e.target.value)}
            />
          </div>
          <div>
            <S.USER_BUTTON onClick={handleSignUp} disabled={!isButtonActive} $active={isButtonActive}>
              회원가입
            </S.USER_BUTTON>
          </div>
        </form>
        <S.CAPTION onClick={() => navigate('/')}>로그인</S.CAPTION>
      </S.USER_CONTAINER>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default SignUp;
