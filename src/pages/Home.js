import { useNavigate } from "react-router-dom";
import "./Home.css";
import lighthouseaiLogo from "../assets/img/lighthouseai_logo.png";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import TravelCard from "../components/travel/TravelCard";
import api from "../components/RefreshApi";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const [travelList, setTravelList] = useState([]);
    const [search, setSearch] = useState({});
    const [isSearching, setIsSearching] = useState(false);

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
                // 쿠키 삭제
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

    const gotoMyTravelContent = () => {
        navigate('/mytravelcontent');
    }

    const onChange = (e) => {
        // 영어인 경우 대소문자 구분 중
        const searchText = e.target.value;
        setSearch(searchText);
        console.log(searchText);
        if (searchText.trim() === '') {
            setIsSearching(false);
        } else {
            setIsSearching(true);
        }
    }
    
    const searched = travelList.filter((item) =>
        // 현재는 타이틀만 기준으로 검색
        item.title.includes(search)
    )

    const getTravelList = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/cafes'); // 변경 필요 travel visitor
        console.log(res.data);
        setTravelList(res.data);
        console.log(travelList);
    }

    useEffect(() => {
        getTravelList();
    }, [])

    const isLogin = !!localStorage.getItem("accessToken");

    return (
        <div className="home">
            <div className="home-left">
                <div className="home-left-upper">
                    <div className='home-logo'>
                        <img src={lighthouseaiLogo} alt="로고" height={"60px"} id='home-logo' onClick={gotoHome}></img>
                    </div>
                    {!isLogin && <button className="home-login" onClick={gotoLogin}>로그인</button>}
                    {isLogin && <button className="home-logout" onClick={handleLogout}>로그아웃</button>}
                    <div className='home-category'>
                        <button className="home-board" onClick={gotoBoard}>자유게시판</button>
                        {isLogin && <button className="home-myboard" onClick={gotoMyBoard}>내 게시물</button>}
                        {isLogin && <button className="home-mypage" onClick={gotoMyPage}>내 페이지</button>}
                        {isLogin && <button className="home-myTcontent" onClick={gotoMyTravelContent}>내 방문지</button>}
                    </div>
                </div>
            </div>
            <div className="home-right">
                <div className="home-right-upper">
                    <div className="home-search">
                        <input type="search" name="sv" className="home-search-input" onChange={onChange} placeholder="   여행지를 검색해주세요" />
                        <CiSearch className="home-search-icon" />
                    </div>
                </div>
                <div className="home-right-content">
                    {!isSearching ? (
                        travelList.map((travel) => (
                            <TravelCard key={travel.id} title={travel.title} description={travel.description} imageUrl={travel.imageUrl} />
                        ))
                    ) : (
                        searched.length === 0 ? (
                            <span>검색 결과가 없습니다</span>
                        ) : (
                            searched.map((item) => (
                                <TravelCard key={item.id} {...item} />
                            ))
                        )
                    )}

                </div>
            </div>
        </div>
    )
}

export default Home;