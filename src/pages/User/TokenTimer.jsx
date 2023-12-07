import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isTokenExpired = tokenInfo => {
  return new Date().getTime() > tokenInfo; // 현재 시간 초과
};

const TokenTimer = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);
  const tokenExpitationTime = JSON.parse(localStorage.getItem('tokenExpitationTime'));

  if (isTokenExpired(tokenExpitationTime)) {
    localStorage.removeItem('tokenExpitationTime');
    toast.success('토큰 만료로 재로그인이 필요합니다.');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = tokenExpitationTime - currentTime;

      if (timeDifference > 0) {
        setTimeLeft(Math.floor(timeDifference / 1000));
      } else {
        setTimeLeft(0);
        clearInterval(interval);
      }
    }, 1000); // 1초마다 갱신

    return () => clearInterval(interval);
  }, [navigate, tokenExpitationTime]);

  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };
  return (
    <>
      <p>토큰 만료까지 남은 시간: {formatTime()}</p>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default TokenTimer;
