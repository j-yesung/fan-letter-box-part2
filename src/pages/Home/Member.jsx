import React from 'react';
import styled from 'styled-components';
import { members } from 'util/member';

const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
`;
const IMG = styled.img`
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

const Member = () => {
  return (
    <>
      <SectionContainer>
        {members.map(item => (
          <IMG key={item.name} src={item.img} alt={item.name} />
        ))}
      </SectionContainer>
    </>
  );
};

export default Member;
