import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import BoardDetailEach from "../../components/BoardEach/BoardDetailEach";
import  lighthouseaiLogo  from "../../assets/img/lighthouseai_logo.png";

const BoardDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const getBoardDetailEach = async () => {
        console.log(햣id);
        const resp = await axios.get(`http://localhost:8080/api/v1/boards/${id}`);
        setBoard(resp.data);
        setLoading(false);
    };

    const isLogin = !!localStorage.getItem("accessToken");

    useEffect(() => {
        getBoardDetailEach();
    }, [])

    const gotoHome = () => {
        navigate('/');
    }
    const gotoLogin = () => {
        navigate('/login');
    }

    const gotoBoard = () => {
        navigate('/boards');
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
    const backToList = () => {
        navigate('/board');
    }


    return (
        <div>


            {loading ? (
                <h2>loading...</h2>
            ) : (
                <div>
                    <div className='board'>
                        <div className='board-left'>
                            <div className="board-left-upper">
                                <div className='board-logo'>
                                    <img src={lighthouseaiLogo} alt="로고" height={"60px"} id='board-logo' onClick={gotoHome}></img>
                                </div>
                                <div className='board-category'>
                                    <button className="board-board" onClick={gotoBoard}>자유게시판</button>
                                    {isLogin && <button className="home-myboard" onClick={gotoMyBoard}>내 게시물</button>}
                                    {isLogin && <button className="home-mypage" onClick={gotoMyPage}>내 페이지</button>}
                                    {isLogin && <button className="home-myTcontent" onClick={gotoMyTravelContent}>내 방문지</button>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <BoardDetailEach
                        id={board.boardId}
                        title={board.title}
                        content={board.content}
                        nickname={board.nickname}
                    />
                </div>
            )}


        </div>
    );

};

export default BoardDetail;