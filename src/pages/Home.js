import { Link, useNavigate } from "react-router-dom";
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

    const gotoRecommand = () => {
        navigate('/recommand');
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

    const gotoTravelRegister = () => {
        navigate('/travelRegister');
    }

    const onChange = (e) => {
        // 영어인 경우 대소문자 구분 중
        const searchText = e.target.value;
        setSearch(searchText);
        if (searchText.trim() === '') {
            setIsSearching(false);
        } else {
            setIsSearching(true);
        }
    }
    
    const searched = travelList.filter((item) =>
        item.title.includes(search)
    )

    const getTravelList = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/travels');
        setTravelList(res.data);
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
                        <button className="home-recommand" onClick={gotoRecommand}>AI 추천</button>
                        {isLogin && <button className="home-myboard" onClick={gotoMyBoard}>내 게시물</button>}
                        {isLogin && <button className="home-mypage" onClick={gotoMyPage}>내 페이지</button>}
                        {isLogin && <button className="home-mytravel" onClick={gotoMyTravel}>내 여행지</button>}
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
                        travelList.reverse().map((travel) => (
                            <Link key={travel.id} to={`/travel/${travel.id}`} style={{ textDecoration: "none"}}>
                                <TravelCard key={travel.id} title={travel.title} writer={travel.writer } star={travel.star} image_url={travel.image_url} style={{ color: "black", textDecoration: "none", visited: "pink", Height: "300px" }} />
                            </Link>
                        ))
                    ) : (
                        searched.length === 0 ? (
                            <span>검색 결과가 없습니다</span>
                        ) : (
                            searched.map((item) => (
                                <Link key={item.id} to={`/travel/${item.id}`} style={{ textDecoration: "none" }}>
                                <TravelCard {...item} style={{ color: "black", textDecoration: "none", visited: "pink", Height: "300px" }}/>
                            </Link>
                            ))
                        )
                    )}
                </div>
                <div className="home-right-bottom">
                {isLogin && <button className="home-travelRegisterBt" onClick={gotoTravelRegister}>+</button>}
                </div>
            </div>
        </div>
    )
}

export default Home;