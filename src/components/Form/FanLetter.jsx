import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __addLetter, __deleteLetter, __fetchLetter, __updateLetter } from 'redux/modules/fanLetterSlice';
import { getFormattedDate } from 'util/date';
import { members } from 'util/member';
import * as S from './FanLetter.styled';
import shortid from 'shortid';
import Select from './Select';

const BoardComponent = () => {
  const dispatch = useDispatch();
  const fanLetterBox = useSelector(state => state.fanLetter.fanLetter);
  /**
   * TODO : ref 고려하기
   */
  const [newLetter, setNewLetter] = useState({ content: '' });
  const [editingLetter, setEditingLetter] = useState(null);
  console.log('🚀 ~ 팬레터 함', fanLetterBox);

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
    setNewLetter({ content: '' });
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

  return (
    <>
      {/* <Select /> */}
      <S.FormContainer>
        <S.Form>
          <span>멤버 선택 : </span>
          <select onChange={e => setNewLetter({ ...newLetter, member: e.target.value })}>
            <option>멤버를 선택해 주세요.</option>
            {members.map(item => (
              <option key={item.id}>👉 {item.name}</option>
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
        <S.LetterContainer>
          {fanLetterBox &&
            fanLetterBox.map(item => (
              <S.Letters key={item.id}>
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
    </>
  );
};

export default BoardComponent;
