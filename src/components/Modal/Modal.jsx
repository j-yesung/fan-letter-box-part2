import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __deleteLetter, __updateLetter } from 'redux/modules/fanLetterSlice';
import * as S from './Modal.styled';
import { getLetters, updateLetter } from 'apis/letters';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const Modal = ({ isOpen, closeModal, id }) => {
  const dispatch = useDispatch();
  // const fanLetterBox = useSelector(state => state.fanLetter.fanLetter);
  const [isEditing, setIsEditing] = useState(false);
  const [findLetterData, setFindLetterData] = useState();
  const { isLoading, isError, data } = useQuery('letters', getLetters);
  const [editingLetter, setEditingLetter] = useState({ id: '', content: '' });
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const editContentRef = useRef();
  const modalRef = useRef();
  const queryClient = useQueryClient();
  const mutation = useMutation(updateLetter, {
    onSuccess: () => {
      queryClient.invalidateQueries('letters');
    },
  });

  useEffect(() => {
    if (id && data) {
      const modalData = data.find(item => item.id === id);
      setFindLetterData(modalData);
    }
  }, [id, data]);

  // 수정
  const handleEditLetter = data => {
    setEditingLetter(data);
    setIsEditing(true);
  };

  // 수정완료
  const handleUpdateLetter = async () => {
    const updatedLetter = { id: findLetterData.id, content: editContentRef.current.value };
    await updateLetter(updatedLetter);
    // dispatch(__updateLetter(updatedLetter));
    const updatedData = await getLetters(); // 업데이트된 데이터 가져오기
    const modalData = updatedData.find(item => item.id === id);
    setFindLetterData(modalData); // 업데이트된 데이터로 상태 업데이트
    // setEditingLetter(null);
    setIsEditing(false);
  };
  // 삭제
  const handleDeleteLetter = id => {
    dispatch(__deleteLetter(id));
    closeModal();
  };

  const modalOutSideClick = e => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  return (
    <S.ModalWrapper $isOpen={isOpen} ref={modalRef} onClick={modalOutSideClick}>
      <S.ModalContent>
        {findLetterData && (
          <>
            <div key={findLetterData.id}>
              <S.ProfileWrapper>
                <S.Box1>
                  <img src={userInfo.avatar} width={50} alt="사진" />
                  <p>{userInfo.nickname}</p>
                </S.Box1>
                <S.Box2>
                  <p>{findLetterData.date}</p>
                </S.Box2>
              </S.ProfileWrapper>
              <S.MemberName>{findLetterData.member}에게..</S.MemberName>
              {isEditing ? (
                <S.TextArea ref={editContentRef} defaultValue={findLetterData.content} />
              ) : (
                <S.LetterContent>{findLetterData.content}</S.LetterContent>
              )}
            </div>
            <S.ButtonsWrapper>
              {/* 유저 정보의 아이디와 게시글의 담겨 있는 유저 아이디와 일치할 경우 수정 삭제 버튼 보여주기 */}
              {userInfo.userId === findLetterData.userId && (
                <>
                  {isEditing ? (
                    <>
                      <S.Button $color={'#9ADE7B'} onClick={handleUpdateLetter}>
                        수정완료
                      </S.Button>
                      <S.Button $color={'#FFA33C'} onClick={() => setIsEditing(false)}>
                        취소
                      </S.Button>
                    </>
                  ) : (
                    <>
                      <S.Button $color={'#F24C3D'} onClick={() => handleDeleteLetter(findLetterData.id)}>
                        삭제
                      </S.Button>
                      <S.Button $color={'#9ADE7B'} onClick={() => handleEditLetter(editingLetter)}>
                        수정
                      </S.Button>
                    </>
                  )}
                </>
              )}
            </S.ButtonsWrapper>
          </>
        )}
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

export default Modal;
