import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/user/Login';
import KakaoRedirect from './pages/user/KakaoRedirect';
import NaverRedirect from './pages/user/NaverRedirect';
import SignUp from './pages/user/Signup';
import PrivateRoute from './pages/PrivateRoute';
import MyPage from './pages/user/MyPage';
import MyInfo from './pages/user/MyInfo';
import Board from './pages/board/Board';
import Recommand from './pages/AI/Recommand';
import TravelRegister from './pages/travel/TravelRegister';
import TravelDetail from './pages/travel/TravelDetail';
import MyTravel from './pages/user/MyTravel';
import TravelUpdate from './pages/travel/TravelUpdate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/api/v1/users/kakao/login/callback" element={<KakaoRedirect />}></Route>
        <Route path="/api/v1/users/naver/login/callback" element={<NaverRedirect />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/recommand" element={<Recommand/>}></Route>
        <Route path="/travel/:id" element={<TravelDetail/>}></Route>
        {/* 로그인 후 가능 */}
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/myinfo" element={<MyInfo />}></Route>
          <Route path="/travelRegister" element={<TravelRegister/>}></Route>
          <Route path="/mytravel" element={<MyTravel/>}></Route>
          <Route path="/travel/update/:id" element={<TravelUpdate/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
