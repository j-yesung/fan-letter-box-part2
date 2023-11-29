import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { members } from 'util/member';

const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Select = () => {
  const fanLetterBox = useSelector(state => state.fanLetter.fanLetter); // 멤버 이름 담긴 댓글을 가져와야 함.
  console.log('fanLetterBox: ', fanLetterBox);

  const onChangeSelectHandler = e => {
    console.log(e.target.value);
  };

  return (
    <>
      <SelectContainer>
        <span>멤버 선택 : </span>
        <select onChange={onChangeSelectHandler}>
          {members.map(item => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
      </SelectContainer>
    </>
  );
};

export default Select;
