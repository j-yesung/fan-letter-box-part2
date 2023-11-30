import styled from 'styled-components';

export const USER_CONTAINER = styled.div`
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 305px;
  transform: translate(-50%, -50%);
  padding: 20px;
  line-height: 2rem;
  border-radius: 10px;
  box-sizing: border-box;
  max-width: 100%;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 8px #ccc;
`;
export const USER_TITLE = styled.h1`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;
export const INPUT = styled.input`
  width: 100%;
  height: 35px;
  margin: 7px 0px 5px;
  padding-left: 8px;
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  font-size: 13px;
`;
export const USER_BUTTON = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #39a7ff;

  &:hover {
    background-color: #ccc;
  }
`;
export const CAPTION = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  font-size: 13px;
  cursor: pointer;
`;
