import Layout from 'layout/Layout';
import Main from 'pages/Home/Main';
import Login from 'pages/User/Login';
import Profile from 'pages/User/Profile';
import SignUp from 'pages/User/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
