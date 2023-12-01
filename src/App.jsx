import Router from 'shared/Router';
import GlobalStyles from './styles/GlobalStyles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAccessToken } from 'redux/modules/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const LOCAL_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    if (LOCAL_TOKEN) {
      dispatch(setAccessToken(LOCAL_TOKEN));
    }
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
