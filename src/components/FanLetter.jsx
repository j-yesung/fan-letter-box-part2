import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __fetchLetter, __addLetter, __deleteLetter, __updateLetter } from 'redux/modules/fanLetterSlice';

const BoardComponent = () => {
  const dispatch = useDispatch();
  const fanLetterBox = useSelector(state => state.fanLetter.fanLetter);
  const [newLetter, setNewLetter] = useState({ title: '', content: '' });
  const [editingLetter, setEditingLetter] = useState(null);
  console.log('🚀 ~ 팬레터 함', fanLetterBox);

  // 조회
  useEffect(() => {
    dispatch(__fetchLetter());
  }, [dispatch]);

  // 등록
  const handleAddLetter = () => {
    dispatch(__addLetter(newLetter));
    setNewLetter({ title: '', content: '' });
  };

  // 수정
  const handleEditLetter = id => setEditingLetter(id);
  // 수정완료
  const handleUpdateLetter = letter => {
    const updatedLetter = { id: letter.id, title: editingLetter.title, content: editingLetter.content };
    dispatch(__updateLetter(updatedLetter));
    setEditingLetter(null);
  };
  // 삭제
  const handleDeleteLetter = id => dispatch(__deleteLetter(id));

  return (
    <div>
      <div>
        <h2>뉴진스 팬레터</h2>
        <input
          type="text"
          placeholder="제목"
          value={newLetter.title}
          onChange={e => setNewLetter({ ...newLetter, title: e.target.value })}
        />
        <textarea
          placeholder="내용"
          value={newLetter.content}
          onChange={e => setNewLetter({ ...newLetter, content: e.target.value })}
        />
        <button onClick={handleAddLetter}>보내기</button>
      </div>
      {fanLetterBox &&
        fanLetterBox.map(item => (
          <div key={item.id}>
            {editingLetter?.id === item.id ? (
              <>
                <input
                  type="text"
                  value={editingLetter.title}
                  onChange={e => setEditingLetter({ ...editingLetter, title: e.target.value })}
                />
                <textarea
                  value={editingLetter.content}
                  onChange={e => setEditingLetter({ ...editingLetter, content: e.target.value })}
                />
                <button onClick={() => handleUpdateLetter(item)}>수정완료</button>
              </>
            ) : (
              <>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <button onClick={() => handleDeleteLetter(item.id)}>삭제</button>
                <button onClick={() => handleEditLetter(item)}>수정</button>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default BoardComponent;
