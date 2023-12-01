import React, { useEffect, useRef, useState } from 'react';
import API from '../../apis/api/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from 'redux/modules/authSlice';
import userDefaultImg from 'assets/user.svg';
import * as S from './User.styled.js';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
  const { userInfo, loading } = useSelector(state => state.userInfo);
  const nicknameRef = useRef();
  const imgRef = useRef();

  const [img, setImg] = useState();
  const [nickname, setNickname] = useState();
  const [isEditing, setIsEditing] = useState(false);

  console.log('userInfo ', userInfo);

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
    formData.append('avatar', imgRef.current.files[0]);
    formData.append('nickname', nicknameRef.current.value);

    const response = await API.patch('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    setNickname(response.data.nickname);
    setImg(response.data.avatar);
  };

  return (
    <>
      {/* 닉네임 변경, 이미지 업로드 */}
      {loading && <div>로딩중...</div>}
      <S.WRAPPER>
        <S.USER_CONTAINER>
          {!loading ? (
            userInfo && (
              <>
                <S.USER_IMG_WRAPPER>
                  <S.USER_IMG src={img || userInfo.avatar || userDefaultImg} width={260} alt="사진 없음" />
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
        </S.USER_CONTAINER>
      </S.WRAPPER>
    </>
  );
};

export default Profile;
