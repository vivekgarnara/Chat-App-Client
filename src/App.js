import './App.css';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Chat } from './Components/Chat/Chat';
import { Login } from './Components/Login/Login';
import Register from './Components/Register/Register';
import { Home } from './Components/Home/Home';
import { Profile } from './Components/Profile/Profile';
import { ChatList } from './Components/ChatList/ChatList';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/chat-list' element={<ChatList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
