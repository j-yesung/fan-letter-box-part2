import styled from 'styled-components';

export const WRAPPER = styled.div`
  height: 750px;
`;
export const USER_CONTAINER = styled.div`
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 305px;
  height: 355px;
  transform: translate(-50%, -50%);
  padding: 20px;
  line-height: 2rem;
  border-radius: 10px;
  box-sizing: border-box;
  max-width: 100%;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 8px #ccc;
`;
export const PROFILE_CONTAINER = styled(USER_CONTAINER)`
  height: 320px;
`;
export const USER_TITLE = styled.h1`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 800;
  font-family: 'establishRetrosansOTF';
`;
export const USER_IMG_WRAPPER = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 30%;
  overflow: hidden;
  left: 55px;
`;
export const USER_IMG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const INPUT_WRAPPER = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
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
export const USER_NAME_WRAPPER = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;
export const USER_ID_WRAPPER = styled.div`
  display: flex;
  justify-content: center;
`;
export const USER_NAME = styled(INPUT)``;
export const USER_BUTTON = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  margin-top: 20px;
  border-radius: 5px;
  background-color: ${props => (props.$active ? '#39a7ff' : '#F5F7F8')};
`;
export const BUTTON_WRAPPER = styled.div`
  /* margin-top: 130px; */
`;
export const CAPTION = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  font-size: 13px;
  cursor: pointer;
`;
export const Button = styled.button`
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  background: #333;
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
export const MODIFY_BUTTON = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #39a7ff;
`;
