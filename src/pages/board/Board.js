import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import lighthouseaiLogo from "../../assets/img/lighthouseai_logo.png"
import { useNavigate } from 'react-router-dom';
import "./Board.css";
import axios from "axios";
import api from "../../components/RefreshApi";
import { Link } from "react-router-dom";

const Board = () => {
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [board, setBoard] = useState([])
    const [pageList, setPageList] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [search, setSearch] = useState({
        page: 1,
        sk: '',
        sv: '',
    });

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
    const gotoBoardWrite = () => {
        navigate('/boards/create');
    }

    const gotoMyPage = () => {
        navigate('/mypage');
    }

    const gotoMyTravel = () => {
        navigate('/mytravel');
    }

    const getBoardList = async (page) => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/boards', {
                params: { page: page }
            });
            setBoardList(res.data);
            if (res.data.length <= 10) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch (error) {
            console.error('getBoardList 오류', error);
        }
    }

    const onClickPage = (e) => {
        let value = e.target.value;
        setSearch({
            ...search,
            page: value,
        });
        getBoardList();
    };

    useEffect(() => {
        getBoardList(page);
    }, [page]);

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
                        <button className="board-board" onClick={gotoBoard}>자유게시판</button>
                        {isLogin && <button className="board-board" onClick={gotoMyBoard}>내 게시물</button>}
                        {isLogin && <button className="board-board" onClick={gotoMyPage}>내 페이지</button>}
                        {isLogin && <button className="board-board" onClick={gotoMyTravel}>내 방문지</button>}
                    </div>
                </div>
            </div>
            <div className="board-right">
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
                            </tr>
                        </thread>
                        <tbody className="board-notice">
                            <tr>
                                {boardList.map((board, index) => (
                                    <Link key={board.id} to={`/boards/${board.id}`} style={{ textDecoration: "none" }}>
                                        <li style={{ listStyleType: 'none', paddingBottom: '10px', height: '10px' }}>
                                            <td style={{ textAlign: 'center', width: '50px' }}>{boardList.length - index}</td>
                                            <td><span style={{ padding: '20px' }}>{board.title}</span></td>
                                        </li>
                                        <hr style={{ color: "lightGray" }} />
                                    </Link>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <IoIosAddCircle id="board-addboard" onClick={gotoBoardWrite} style={{ width: '4vw', height: '4vh' ,marginLeft: '35vw'}}/>
                    <div className="board-pagenation"></div>
                    {pageList.map((page, index) => (
                        <button key={index} onClick={onClickPage} value={page} id="pageListBtn">
                            {page}
                        </button>
                    ))}
                    <button onClick={() => setPage(page - 1)} disabled={page === 0}>이전</button>
                    <button onClick={() => setPage(page + 1)} disabled={!hasMore}>다음</button>
                </div>
            </div>
        </div>
    )
}

export default Board;