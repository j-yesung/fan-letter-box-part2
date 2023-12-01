import FanLetter from 'components/Form/FanLetter';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { members } from 'util/member';

const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
`;
const IMG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${props => props.$img});
  background-position: center;
  background-size: cover;
  transition: 0.25s;
  width: 500px;
  height: 300px;
  margin: 20px;
  cursor: pointer;
  filter: ${props => (props.$isActive ? 'grayscale(0)' : 'grayscale(1)')};

  &:hover {
    filter: grayscale(0);
    transform: scale(1.1);
  }
`;

const Main = () => {
  const navigate = useNavigate();
  const [activeMember, setActiveMember] = useState('민지');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleClickActive = name => {
    if (name === activeMember) return;
    setActiveMember(name === activeMember ? null : name);
  };

  /**
   * 토큰 함수들 따로 유틸로 따로 빼자.
   * @param {*} tokenInfo
   * @returns
   */

  // 토큰이 만료되었는지 확인하는 함수
  // const isTokenExpired = tokenInfo => {
  //   const currentTime = new Date().getTime();
  //   return currentTime > tokenInfo.expirationTime;
  // };

  // 로그인 이후에 토큰 확인 로직 => 만료 시 로그인으로 이동
  // const checkToken = () => {
  //   console.log('토큰 유효 기간 확인 중...');
  //   // 토큰이 만료되면 로그인으로 이동
  //   if (isTokenExpired(userInfo.expirationTime)) navigate('/');
  // };
  // checkToken();

  return (
    <>
      <SectionContainer>
        {members.map(item => (
          <IMG
            key={item.id}
            $img={item.img}
            $isActive={item.name === activeMember}
            onClick={() => handleClickActive(item.name)}
          />
        ))}
      </SectionContainer>
      <FanLetter activeMember={activeMember} />
    </>
  );
};

export default Main;
