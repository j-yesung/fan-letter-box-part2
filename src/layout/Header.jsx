import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
const HeaderLogo = styled.h1`
  font-size: 30px;
  font-weight: 400;
`;
const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <HeaderLogo>New Jeans</HeaderLogo>
        <HeaderButtons>
          <button onClick={() => navigate('/')}>홈으로</button>
          {ACCESS_TOKEN ? (
            <>
              <button onClick={() => navigate('/mypage')}>마이페이지</button>
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
