import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
export const Form = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 300px;
  height: 150px;
`;
export const FormSubmitButtonWarpper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const LetterContainer = styled.ul`
  background-color: #eee;
  width: 300px;
  height: 600px;
  overflow-y: scroll;
`;
export const Letters = styled.li`
  background-color: beige;
  display: flex;
  gap: 10px;
  padding: 10px;
  flex-direction: column;
`;
export const LetterButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
