import Layout from 'layout/Layout';
import Main from 'pages/Home/Main';
import Login from 'pages/User/Login';
import SignUp from 'pages/User/SignUp';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
