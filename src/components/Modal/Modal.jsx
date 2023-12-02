import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __deleteLetter, __updateLetter } from 'redux/modules/fanLetterSlice';
import * as S from './Modal.styled';

const Modal = ({ isOpen, closeModal, id }) => {
  const dispatch = useDispatch();
  const fanLetterBox = useSelector(state => state.fanLetter.fanLetter);
  const [isEditing, setIsEditing] = useState(false);
  const [findLetterData, setFindLetterData] = useState();
  const [editingLetter, setEditingLetter] = useState({ id: '', content: '' });
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const editContentRef = useRef();
  const modalRef = useRef();

  useEffect(() => {
    if (id && fanLetterBox) {
      const data = fanLetterBox.find(item => item.id === id);
      setFindLetterData(data);
    }
  }, [id, fanLetterBox]);

  // 수정
  const handleEditLetter = data => {
    setEditingLetter(data);
    setIsEditing(true);
  };

  // 수정완료
  const handleUpdateLetter = () => {
    const updatedLetter = { id: findLetterData.id, content: editContentRef.current.value };
    dispatch(__updateLetter(updatedLetter));
    setEditingLetter(null);
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
              {isEditing ? (
                <>
                  <button onClick={handleUpdateLetter}>수정완료</button>
                  <button onClick={() => setIsEditing(false)}>취소</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleDeleteLetter(findLetterData.id)}>삭제</button>
                  <button onClick={() => handleEditLetter(editingLetter)}>수정</button>
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
