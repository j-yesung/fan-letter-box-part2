import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../apis/api/user';
import * as S from './User.styled';

const SignUp = () => {
  const navigate = useNavigate();
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const nameRef = useRef(null);

  /**
   * 회원가입 진행
   */
  const handleSignUp = async e => {
    e.preventDefault();
    await API.post('/register', {
      id: idRef.current.value,
      password: pwRef.current.value,
      nickname: nameRef.current.value,
    })
      .then(res => {
        console.log(res.data); // { message: '회원가입 완료', success: true }
        alert(`${res.data.message}`);
        navigate('/');
      })
      .catch(err => {
        console.error('회원가입 실패', err.message);
      });
  };

  // TODO : 로그인 실패 시 에러 핸들링 => error message로??

  return (
    <>
      <S.USER_CONTAINER>
        <S.USER_TITLE>회원가입</S.USER_TITLE>
        <form>
          <div>
            <S.INPUT ref={idRef} type="text" placeholder="아이디" required />
          </div>
          <div>
            <S.INPUT ref={pwRef} type="password" placeholder="비밀번호" required />
          </div>
          <div>
            <S.INPUT ref={nameRef} type="text" placeholder="닉네임" required />
          </div>
          <div>
            <S.USER_BUTTON onClick={handleSignUp}>회원가입</S.USER_BUTTON>
          </div>
        </form>
        <S.CAPTION onClick={() => navigate('/')}>로그인</S.CAPTION>
      </S.USER_CONTAINER>
    </>
  );
};

export default SignUp;
