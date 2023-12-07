import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __addLetter, __fetchLetter } from 'redux/modules/fanLetterSlice';
import { getFormattedDate } from 'util/date';
import { members } from 'util/member';
import * as S from './FanLetter.styled';
import shortid from 'shortid';
import Modal from 'components/Modal/Modal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addLetter, getLetters } from 'apis/letters';

const FanLetter = ({ activeMember }) => {
  const dispatch = useDispatch();
  // const fanLetterBox = useSelector(state => state.fanLetter.fanLetter);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [newLetter, setNewLetter] = useState({
    content: '',
    member: '민지',
    nickname: userInfo.nickname,
    userId: userInfo.userId,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendId, setSendId] = useState();
  const { isLoading, isError, data } = useQuery('letters', getLetters);
  const queryClient = useQueryClient();
  const mutation = useMutation(addLetter, {
    onSuccess: () => {
      queryClient.invalidateQueries('letters');
    },
  });
  console.log('mutation: ', mutation);

  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  // useEffect(() => {
  //   dispatch(__fetchLetter());
  // }, [dispatch]);

  const handleAddLetter = id => {
    // dispatch(__addLetter({ ...newLetter, id: shortid.generate(), date: getFormattedDate(new Date()) }));
    mutation.mutate(id, { ...newLetter, id: shortid.generate(), date: getFormattedDate(new Date()) });
    setNewLetter({ content: '', member: newLetter.member, name: userInfo.nickname });
  };

  const openModal = id => {
    setSendId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {userInfo && (
        <>
          <S.FormContainer>
            <S.Form>
              <S.FormText>팬레터 보낼 멤버 선택 : </S.FormText>ㅋ
              <select onChange={e => setNewLetter({ ...newLetter, member: e.target.value })}>
                {members.map(item => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
              <S.FormText>{userInfo.nickname}</S.FormText>
              <S.FormTextArea
                placeholder="내용"
                maxLength={100}
                value={newLetter.content}
                onChange={e => setNewLetter({ ...newLetter, content: e.target.value })}
              />
              <S.FormSubmitButtonWarpper>
                <S.Button onClick={handleAddLetter}>보내기</S.Button>
              </S.FormSubmitButtonWarpper>
            </S.Form>
            <S.LetterContainer>
              {data &&
                data
                  .filter(item => item.member === activeMember)
                  .map(item => (
                    <S.Letters key={item.id} onClick={() => openModal(item.id)}>
                      <>
                        <span>{userInfo.nickname}</span>
                        <p>{item.content}</p>
                        <p>{item.date}</p>
                      </>
                    </S.Letters>
                  ))}
            </S.LetterContainer>
          </S.FormContainer>
        </>
      )}
      {/* Modal 컴포넌트 */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} id={sendId} />
    </>
  );
};

export default React.memo(FanLetter);
