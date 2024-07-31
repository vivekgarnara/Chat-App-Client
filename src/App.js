import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Chat } from './Components/Chat/Chat';
import { Login } from './Components/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
