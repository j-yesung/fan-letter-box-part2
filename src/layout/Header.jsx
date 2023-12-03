import TokenTimer from 'pages/User/TokenTimer';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from 'redux/modules/authSlice';
import styled from 'styled-components';
import * as S from '../pages/User/User.styled';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
const HeaderLogo = styled.h1`
  font-size: 30px;
  font-weight: 800;
  font-family: 'establishRetrosansOTF';
  cursor: pointer;
`;
const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('tokenExpitationTime');
    dispatch(setUserInfo(null));
    navigate('/');
  };

  return (
    <>
      <HeaderContainer>
        <HeaderLogo onClick={() => navigate('/home')}>NEW JEANS</HeaderLogo>
        <HeaderButtons>
          <TokenTimer /> {/* 토큰 만료 시간 컴포넌트 */}
          <p>{userInfo.nickname}님 안녕하세요.</p>
          <S.Button onClick={() => navigate('/home')}>메인으로</S.Button>
          {userInfo.accessToken ? (
            <>
              <S.Button onClick={() => navigate('/profile')}>마이페이지</S.Button>
              <S.Button onClick={handleLogout}>로그아웃</S.Button>
            </>
          ) : (
            <>
              <S.Button onClick={() => navigate('/')}>로그인</S.Button>
              <S.Button onClick={() => navigate('/signup')}>회원가입</S.Button>
            </>
          )}
        </HeaderButtons>
      </HeaderContainer>
    </>
  );
};

export default Header;
