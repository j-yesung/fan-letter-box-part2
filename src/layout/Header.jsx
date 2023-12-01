import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from 'redux/modules/authSlice';
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
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ACCESS_TOKEN = useSelector(state => state.userInfo.accessToken);

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    dispatch(setAccessToken(null));
    navigate('/home');
  };

  return (
    <>
      <HeaderContainer>
        <HeaderLogo onClick={() => navigate('/home')}>New Jeans</HeaderLogo>
        <HeaderButtons>
          <button onClick={() => navigate('/home')}>홈으로</button>
          {ACCESS_TOKEN ? (
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
