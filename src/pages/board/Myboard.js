import { useEffect, useState } from "react";
import lighthouseaiLogo from "../../assets/img/lighthouseai_logo.png"
import { Link, useNavigate } from 'react-router-dom';
import api from "../../components/RefreshApi";
import { CiSearch } from "react-icons/ci";
import "../user/MyTravel.css"

const MyBoard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  const onChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
    if (searchText.trim() === '') {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  }

  const gotoHome = () => {
    navigate('/');
  }

  const gotoLogin = () => {
    navigate('/login');
  }

  const handleLogout = () => {
    const procLogout = async () => {
      try {
        const res = await api.post('/users/logout');
        localStorage.clear();
        navigate('/');
      } catch (e) {
        alert('로그아웃 실패');
      }
    };
    procLogout();
  }

  const gotoBoard = () => {
    navigate('/board');
  }

  const gotoMyBoard = () => {
    navigate('/myboard');
  }

  const gotoMyPage = () => {
    navigate('/mypage');
  }

  const gotoMyTravel = () => {
    navigate('/mytravel');
  }

  const [myBoardlList, setMyBoardList] = useState([]);

  const getMyBoardlList = async () => {
    try {
      const res = await api.get('http://localhost:8080/api/v1/boards/user');
      setMyBoardlList(res.data);
    } catch (e) {
      console.error(e);
    }
  }
  
  const searched = myBoardlList.filter((item) =>
    item.title.includes(search)
  )

  useEffect(() => {
    getMyBoardlList();
  }, []);

  const isLogin = !!localStorage.getItem("accessToken");

  return (
    <div className='mytravel'>
      <div className='mytravel-left'>
        <div className="mytravel-left-upper">
          <div className='mytravel-logo'>
            <img src={lighthouseaiLogo} alt="로고" height={"60px"} id='mytravel-logo' onClick={gotoHome}></img>
          </div>
          {!isLogin && <button className="mytravel-login" onClick={gotoLogin}>로그인</button>}
          {isLogin && <button className="mytravel-logout" onClick={handleLogout}>로그아웃</button>}
          <div className='mytravel-category'>
            <button className="mytravel-board" onClick={gotoBoard}>자유게시판</button>
            {isLogin && <button className="mytravel-myboard" onClick={gotoMyBoard}>내 게시물</button>}
            {isLogin && <button className="mytravel-mypage" onClick={gotoMyPage}>내 페이지</button>}
            {isLogin && <button className="mytravel-mytravel" onClick={gotoMyTravel}>내 여행지</button>}
          </div>
        </div>
      </div>
      <div className="mytravel-right">
        <div className='mytravel-right-upper'>
          <div className='mytravel-search'>
            <CiSearch className="mytravel-search-icon" />
            <input type="search" name="sv" className="mytravel-search-input" onChange={onChange} placeholder="   검색해주세요" />
          </div>
        </div>
        <div className='mytravel-right-center'>
          <table className="mytravel-bdlist">
            <thread>
              <tr>
                <th scope="col" className="mytravel-bd-no" style={{ paddingLeft: '10px' }}>
                  <span>번호</span>
                </th>
                <th scope="col" className="mytravel-bd-title" style={{ paddingLeft: '30px', width: '35vw', textAlign: 'left' }}>
                  <span>제목</span>
                </th>
              </tr>
            </thread>
            <hr />
            <tbody className="mytravel-notice">
              <tr>
                {myBoardList.slice().reverse().map((myboard, index) => (
                  <Link key={myboard.id} to={`/board/${myboard.id}`} style={{ textDecoration: "none" }}>
                    <li style={{ listStyleType: 'none', paddingBottom: '10px', height: '10px' }}>
                      <table>
                        <tr>
                          <td style={{ textAlign: 'center', width: '50px' }}>{myTravelList.length - index}</td>
                          <td><span style={{ padding: '20px' }}>{mytravel.title}</span></td>
                        </tr>
                      </table>
                    </li>
                    <hr style={{ color: "lightGray" }} />
                  </Link>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyBoard;