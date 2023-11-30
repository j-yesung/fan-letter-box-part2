import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  width: 60%;
  max-width: 500px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: #555;
`;

const Modal = ({ isOpen, closeModal, id }) => {
  const fanLetterBox = useSelector(state => state.fanLetter.fanLetter);
  const [findLetterData, setFindLetterData] = useState(null);

  useEffect(() => {
    if (id && fanLetterBox) {
      const data = fanLetterBox.find(item => item.id === id);
      console.log('data: ', data);
      setFindLetterData(data);
    }
  }, [id, fanLetterBox]);

  return (
    <ModalWrapper $isOpen={isOpen}>
      <ModalContent>
        <ModalCloseButton onClick={closeModal}>&times;</ModalCloseButton>
        dd
        {findLetterData && (
          <div key={findLetterData.id}>
            <p>닉네임 : {findLetterData.member}</p>
            <p>내용 : {findLetterData.content}</p>
            <p>날짜 : {findLetterData.date}</p>
          </div>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
