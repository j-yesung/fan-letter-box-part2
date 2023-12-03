import styled from 'styled-components';

export const ModalWrapper = styled.div`
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
export const ModalContent = styled.div`
  background: #fff;
  width: 60%;
  max-width: 500px;
  height: 300px;
  margin: 320px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;
export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  justify-content: space-between;
`;
export const Box1 = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const Box2 = styled.div`
  display: flex;
`;
export const MemberName = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
`;
export const LetterContent = styled.div`
  background-color: #f0ece5;
  border-radius: 5px;
  padding: 10px;
  height: 100px;
`;
export const TextArea = styled.textarea`
  background-color: #f0ece5;
  width: 100%;
  height: 100px;
  outline: none;
  resize: none;
  border-radius: 5px;
  &:focus {
    border: 2px solid #39a7ff;
  }
`;
export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: #555;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 20px;
  float: right;
`;
export const Button = styled.button`
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  background: ${props => props.$color};
  color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  transition: transform 200ms, background 200ms;
  &:hover {
    transform: translateY(-2px);
  }
`;
