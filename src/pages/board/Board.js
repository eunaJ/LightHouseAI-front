import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import lighthouseaiLogo from "../../assets/img/lighthouseai_logo.png"
import { useNavigate } from 'react-router-dom';
import "./Board.css";
import axios from "axios";
import { MdClear } from "react-icons/md";
import api from "../../components/RefreshApi";

const Board = () => {
    // const [searchVal, setSearchVal] = useState('');
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [pageList, setPageList] = useState([]);

    const [curPage, setCurPage] = useState(0);
    const [prevBlock, setPrevBlock] = useState(0);
    const [nextBlock, setNextBlock] = useState(0); 
    const [lastPage, setLastPage] = useState(0);

    const [search, setSearch] = useState({
        page: 1,
        sk: '',
        sv: '',
    });

    // const handleSearchValChange = (e) => {
    //     setSearchVal(e.target.value);
    // }

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
                console.log(res);
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

    const gotoMyLike = () => {
        navigate('/mylike');
    }

    const gotoMyReview = () => {
        navigate('/myreview');
    }

    const gotoBoardWrite = () => {
        navigate('/board/write');
    }

    const gotoMyPage = () => {
        navigate('/mypage');
    }

    const gotoMyInfo = () => {
        navigate('/myinfo');
    }

    const getBoardList = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/boards');
        console.log(res.data);
        setBoardList(res.data);
        console.log(boardList);
    }

    const handleSearchClear = (e) => {
        setSearch('');
    }

    const onClickPage = (e) => {
        let value = e.target.value;
        setSearch({
            ...search,
            page: value,
        });
        getBoardList();
    };

    const onChange = (event) => {
        const { value, name } = event.target;
        setSearch({
            ...search,
            [name]: value,
        });
    };

    useEffect(() => {
        getBoardList();
    }, []);

    const isLogin = !!localStorage.getItem("accessToken");

    return (
        <div className='board'>
            <div className='board-left'>
                <div className="board-left-upper">
                    <div className='board-logo'>
                        <img src={lighthouseaiLogo} alt="로고" height={"60px"} id='board-logo' onClick={gotoHome}></img>
                    </div>
                    {!isLogin && <button className="board-login" onClick={gotoLogin}>로그인</button>}
                    {isLogin && <button className="board-logout" onClick={handleLogout}>로그아웃</button>}
                    <div className='board-category'>
                        {/* 옆 카테고리에 뭐만 보여줄 지 논의 필요 */}
                        <button className="board-board" onClick={gotoBoard}>자유게시판</button>
                        {isLogin && <button className="board-myboard" onClick={gotoMyBoard}>내 게시물</button>}
                        {/* {isLogin && <button className="board-mylike" onClick={gotoMyLike}>내 좋아요</button>} */}
                        {/* {isLogin && <button className="board-myreview" onClick={gotoMyReview}>내 댓글</button>} */}
                        {isLogin && <button className="board-mypage" onClick={gotoMyPage}>내 페이지</button>}
                        {/* {isLogin && <button className="board-myinfo" onClick={gotoMyInfo}>내 정보</button>} */}
                    </div>
                </div>
            </div>
            <div className="board-right">
                <div className='board-right-upper'>
                    <div className='board-search'>
                        <input type="text" name="sv" className="board-search-input" onChange={onChange} placeholder="   검색해주세요" />
                        <MdClear className="board-search-clear-icon" onClick={handleSearchClear} />
                        <CiSearch className="board-search-icon" />
                    </div>
                </div>
                <div className='board-right-center'>
                    <table className="board-bdlist">
                        <thread>
                            <tr>
                                <th scope="col" className="board-bd-no">
                                    <span>번호</span>
                                </th>
                                <th scope="col" className="board-bd-title">
                                    <span>제목</span>
                                </th>
                                <th scope="col" className="board-bd-date">
                                    <span>날짜</span>
                                </th>
                            </tr>
                        </thread>
                        <tbody className="board-notice">
                            <tr>
                                {boardList.map((board) => (
                                    <li key={board.idx}>{board.title}</li>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <IoIosAddCircle id="board-addboard" onClick={gotoBoardWrite} />
                    <div className="board-pagenation"></div>
                    <button onClick={onClickPage} value={1}>
                        &lt;&lt;
                    </button>
                    <button onClick={onClickPage} value={prevBlock}>
                        &lt;
                    </button>
                    {pageList.map((page, index) => (
                        <button key={index} onClick={onClickPage} value={page} id="pageListBtn">
                            {page}
                        </button>
                    ))}
                    <button onClick={onClickPage} value={nextBlock}>
                        &gt;
                    </button>
                    <button onClick={onClickPage} value={lastPage}>
                        &gt;&gt;
                    </button>
                </div>
                {/* <form action="/" method="get" className="home-pagenation">
                        <ul>
                            <li className="lastprev">
                            </li>
                            <li className="prev">
                            </li>
                        </ul>
                    </form> */}
            </div>
        </div>
    )
}

export default Board;