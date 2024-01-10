import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainpage from './page/Main_page/main_page';
import Loginpage from './page/Login_page/Login_page';
import Postpage from './page/post_page/post_page';
import Signuppage from './page/Signup_page/Signup_page';
import PaymentPage from './page/Payments/Payments';
import ChatRoom from './page/chatroom/chatroom';
import WaitingRoom from './page/waiting-room/waiting-room';
import { io } from 'socket.io-client';

// 웹소켓 연결 및 소켓 인스턴스 생성
export const socket = io('http://localhost:3030/chat');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainpage />} />
        <Route path='/Mainpage' element={<Mainpage />} />
        <Route path='/Loginpage' element={<Loginpage />} />
        <Route path='/postpage' element={<Postpage />} />
        <Route path='/Signuppage' element={<Signuppage />} />
        <Route path='/payments' element={<PaymentPage />} />
        <Route path="/wait" element={<WaitingRoom />} />
        <Route path="/room/:roomName" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
