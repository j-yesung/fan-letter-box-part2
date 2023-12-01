import React, { useRef, useState } from 'react';
import API from '../../apis/api/user';
import { useSelector } from 'react-redux';
import userDefaultImg from 'assets/user.svg';
import * as S from './User.styled.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const loading = useSelector(state => state.userInfo.loading);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [img, setImg] = useState(userInfo.avatar || userDefaultImg);
  const [nickname, setNickname] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const nicknameRef = useRef();
  const imgRef = useRef();

  /**
   * TODO : 에러 핸들링
   */

  // 이미지 미리보기
  const handleImageUpload = e => {
    if (e.target.files.length === 0) return; // 폴더 열리고 취소 클릭 시

    const reader = new FileReader();
    reader.readAsDataURL(imgRef.current.files[0]);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  // 회원 정보 수정
  const handleChangeUserInfo = async () => {
    const formData = new FormData();
    formData.append('avatar', imgRef.current.files[0] || setImg(img));
    formData.append('nickname', nicknameRef.current.value);

    try {
      const response = await API.patch('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      });
      toast.success(`${response.data.message}`);
      const data = response.data;
      // 로컬 스토리지 상태 값 변경 후, 다시 setItem 해주기
      if (data.hasOwnProperty('avatar')) {
        userInfo.avatar = data.avatar;
        userInfo.nickname = data.nickname;
      } else {
        userInfo.nickname = data.nickname;
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setNickname(userInfo.nickname);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <div>로딩중...</div>}
      <S.WRAPPER>
        <S.PROFILE_CONTAINER>
          {!loading ? (
            userInfo && (
              <>
                <S.USER_IMG_WRAPPER>
                  <S.USER_IMG src={img} width={260} alt="사진 없음" />
                </S.USER_IMG_WRAPPER>
                {isEditing ? (
                  <S.INPUT_WRAPPER>
                    <input type="text" ref={nicknameRef} defaultValue={nickname || userInfo.nickname} />
                    <input type="file" ref={imgRef} accept="image/*" onChange={handleImageUpload} />
                  </S.INPUT_WRAPPER>
                ) : (
                  <S.USER_NAME_WRAPPER>
                    <p>{nickname || userInfo.nickname}</p>
                  </S.USER_NAME_WRAPPER>
                )}
                <S.BUTTON_WRAPPER>
                  {isEditing ? (
                    <>
                      <S.USER_BUTTON
                        onClick={() => {
                          setIsEditing(!isEditing);
                          handleChangeUserInfo();
                        }}
                      >
                        저장
                      </S.USER_BUTTON>
                    </>
                  ) : (
                    <S.USER_BUTTON onClick={() => setIsEditing(!isEditing)}>수정</S.USER_BUTTON>
                  )}
                </S.BUTTON_WRAPPER>
              </>
            )
          ) : (
            <div>로딩중...</div>
          )}
        </S.PROFILE_CONTAINER>
      </S.WRAPPER>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default Profile;
