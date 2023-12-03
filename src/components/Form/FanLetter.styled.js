import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 750px;
`;
export const Form = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 20px;
`;
export const FormText = styled.span`
  font-size: 15px;
`;
export const FormTextArea = styled.textarea`
  height: 60px;
  outline: none;
  resize: none;
  border-radius: 5px;
  &:focus {
    border: 2px solid #39a7ff;
  }
`;
export const FormSubmitButtonWarpper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const LetterContainer = styled.ul`
  width: 300px;
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* overflow-y: scroll; */
  cursor: pointer;
`;
export const Letters = styled.li`
  display: flex;
  border: 2px solid #333;
  border-radius: 5px;
  gap: 10px;
  padding: 10px;
  flex-direction: column;
  &:hover {
    background-color: #f5f7f8;
  }
`;
export const LetterButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const Button = styled.button`
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  background: #068fff;
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
