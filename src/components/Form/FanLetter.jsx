import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __addLetter, __deleteLetter, __fetchLetter, __updateLetter } from 'redux/modules/fanLetterSlice';
import { getFormattedDate } from 'util/date';
import { members } from 'util/member';
import * as S from './FanLetter.styled';
import shortid from 'shortid';
import Modal from 'components/Modal/Modal';

/**
 * TODO : 유저 정보 수정
 * @param {*} param
 * @returns
 */
const FanLetter = ({ activeMember }) => {
  console.log('🚀 ~ 멤버 이름 > ', activeMember);
  const dispatch = useDispatch();
  const fanLetterBox = useSelector(state => state.fanLetter.fanLetter);
  /**
   * TODO : ref 고려하기
   */
  const [newLetter, setNewLetter] = useState({ content: '', member: '민지' });
  const [editingLetter, setEditingLetter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendId, setSendId] = useState();

  // 조회
  useEffect(() => {
    dispatch(__fetchLetter());
  }, [dispatch]);

  /**
   * TODO : nickname 유저 정보 넣어주기
   * 등록
   */
  const handleAddLetter = () => {
    dispatch(__addLetter({ ...newLetter, id: shortid.generate(), date: getFormattedDate(new Date()) }));
    setNewLetter({ content: '', member: newLetter.member });
  };

  // 수정
  const handleEditLetter = id => setEditingLetter(id);
  // 수정완료
  const handleUpdateLetter = letter => {
    const updatedLetter = { id: letter.id, content: editingLetter.content };
    dispatch(__updateLetter(updatedLetter));
    setEditingLetter(null);
  };
  // 삭제
  const handleDeleteLetter = id => dispatch(__deleteLetter(id));

  const openModal = id => {
    setSendId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <S.FormContainer>
        <S.Form>
          <span>팬레터 보낼 멤버 선택 : </span>
          <select onChange={e => setNewLetter({ ...newLetter, member: e.target.value })}>
            {members.map(item => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
          {/* 유저 정보로 변경해야 합니다. */}
          <span>닉네임</span>
          <textarea
            placeholder="내용"
            value={newLetter.content}
            onChange={e => setNewLetter({ ...newLetter, content: e.target.value })}
          />
          <S.FormSubmitButtonWarpper>
            <button onClick={handleAddLetter}>보내기</button>
          </S.FormSubmitButtonWarpper>
        </S.Form>
        {/* 아래는 나중엔 나눠 보자 */}
        <S.LetterContainer>
          {fanLetterBox &&
            fanLetterBox
              .filter(item => item.member === activeMember)
              .map(item => (
                <S.Letters key={item.id} onClick={() => openModal(item.id)}>
                  {editingLetter?.id === item.id ? (
                    <>
                      {/* 유저 정보로 변경해야 합니다. */}
                      <span>닉네임</span>
                      내용 :
                      <textarea
                        value={editingLetter.content}
                        onChange={e => setEditingLetter({ ...editingLetter, content: e.target.value })}
                      />
                      <S.LetterButtonWrapper>
                        <button onClick={() => handleUpdateLetter(item)}>수정완료</button>
                      </S.LetterButtonWrapper>
                    </>
                  ) : (
                    <>
                      {/* 유저 정보로 변경해야 합니다. */}
                      <span>닉네임</span>
                      <p>내용 : {item.content}</p>
                      <p>날짜 : {item.date}</p>
                      <S.LetterButtonWrapper>
                        <button onClick={() => handleDeleteLetter(item.id)}>삭제</button>
                        <button onClick={() => handleEditLetter(item)}>수정</button>
                      </S.LetterButtonWrapper>
                    </>
                  )}
                </S.Letters>
              ))}
        </S.LetterContainer>
      </S.FormContainer>
      {/* Modal 컴포넌트 */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} id={sendId} />
    </>
  );
};

export default FanLetter;
