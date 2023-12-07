import FanLetter from 'components/Form/FanLetter';
import React, { useState } from 'react';
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
  const [activeMember, setActiveMember] = useState('민지');

  const handleClickActive = name => {
    if (name === activeMember) return;
    setActiveMember(name === activeMember ? null : name);
  };

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

export default React.memo(Main);
