import API from './data';

// 모든 letters 가져오는 api
const getLetters = async () => {
  const response = await API.get('/fanLetter');
  return response.data;
};

const addLetter = async newLetter => {
  await API.post('/fanLetter', newLetter);
};

const updateLetter = async newLetter => {
  await API.patch(`/fanLetter/${newLetter.id}`, { content: newLetter.content });
};

const deleteLetter = async id => {
  await API.delete(`/fanLetter/${id}`);
};

export { getLetters, addLetter, updateLetter, deleteLetter };
