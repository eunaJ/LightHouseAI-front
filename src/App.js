import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Login from './pages/user/Login';
import KakaoRedirect from './pages/user/KakaoRedirect';
import NaverRedirect from './pages/user/NaverRedirect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/api/v1/users/kakao/login/callback" element={<KakaoRedirect />}></Route>
        <Route path="/api/v1/users/naver/login/callback" element={<NaverRedirect />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
