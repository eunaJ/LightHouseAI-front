import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import  lighthouseaiLogo  from "../../assets/img/lighthouseai_logo.png"
import { useNavigate } from 'react-router-dom';
import "./Board.css";
import axios from "axios";
import { MdClear } from "react-icons/md";
import api from "../../components/RefreshApi";

import { Link } from "react-router-dom";


const Board = () => {
    // const [searchVal, setSearchVal] = useState('');
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [board, setBoard] = useState([])
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
        navigate('/boards');
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

    const gotoMyTravelContent = () => {
        navigate('/mytravelcontent');
    }

     const getBoardList = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/boards');
        console.log(res.data);
        setBoardList(res.data);
        console.log(boardList);
    }

    const getBoard = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/boards');
        console.log(res.data);
        setBoardList(res.data);
        console.log(board);
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
    /** 

    const [inputData, setInputData] = useState([{
        idx: '',
        title: ' ',
        createdAt: ' '
      }])

    useEffect(async () => {
        try{
        // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
          const res = await axios.get('http://localhost:8080/api/v1/boards')
          // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
          // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언
          const _inputData = await res.data.map((board) => ({
                  idx: board.idx,
                  title: board.title,
                  createdAt: board.createdAt
                })
          )
          // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
          setInputData(inputData.concat(_inputData))
        } catch(e){
          console.error(e.message)
        }
      },[])
      

      const BoardList = () => {
        const [boards, setBoards] = useState([]); // 1. 상태 관리
      
        useEffect(() => { // 2. 데이터 로딩
          async function fetchBoards() {
            try {
              const response = await axios.get('http://localhost:8080/api/boards'); // 여기서 URL은 예시입니다. 실제 서버 URL로 변경해야 합니다.
              setBoards(response.data); // 서버로부터 받은 데이터를 상태에 저장
            } catch (error) {
              console.error('Error loading the board data', error);
            }
          }
          
          fetchBoards();
        }, []);
    
    async function getData() {
        try {
         const response = await axios.get('http://localhost:8080/api/boards');
            console.log(response);

        } catch (error) {
             console.error(error);
           }
          }
          **/



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
                        {isLogin && <button className="home-myboard" onClick={gotoMyBoard}>내 게시물</button>}
                        {isLogin && <button className="home-mypage" onClick={gotoMyPage}>내 페이지</button>}
                        {isLogin && <button className="home-myTcontent" onClick={gotoMyTravelContent}>내 방문지</button>}
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
                                <tr key={board.id}>
                                    <Link to={`/boards/${board.idx}`}>
                                    {board.title}</Link>
                                    {board.id}
                                </tr>
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