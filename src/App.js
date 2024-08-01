import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Chat } from './Components/Chat/Chat';
import { Login } from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
