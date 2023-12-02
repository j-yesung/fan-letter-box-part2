import TokenTimer from 'pages/User/TokenTimer';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from 'redux/modules/authSlice';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
const HeaderLogo = styled.h1`
  font-size: 30px;
  font-weight: 400;
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
        <HeaderLogo onClick={() => navigate('/home')}>New Jeans</HeaderLogo>
        <HeaderButtons>
          <TokenTimer /> {/* 토큰 만료 시간 컴포넌트 */}
          <p>{userInfo.nickname}님 안녕하세요.</p>
          <button onClick={() => navigate('/home')}>홈으로</button>
          {userInfo.accessToken ? (
            <>
              <button onClick={() => navigate('/profile')}>마이페이지</button>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/')}>로그인</button>
              <button onClick={() => navigate('/signup')}>회원가입</button>
            </>
          )}
        </HeaderButtons>
      </HeaderContainer>
    </>
  );
};

export default Header;
