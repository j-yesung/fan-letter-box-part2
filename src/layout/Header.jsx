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
`;
const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ACCESS_TOKEN = useSelector(state => state.userInfo.accessToken);
  console.log('ACCESS_TOKEN: ', ACCESS_TOKEN);

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    // Redux store의 ACCESS_TOKEN 상태를 변경해줘야지 리렌더링 되면서 아래 조건부 버튼이 바로 변경된다.
    dispatch(setAccessToken(null));
    navigate('/home');
  };

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
