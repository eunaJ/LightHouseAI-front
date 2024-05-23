import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../components/RefreshApi';
import "./Board.css";
import axios from 'axios';
import BoardDetailEach from "../../components/BoardEach/BoardDetailEach";
import lighthouseaiLogo from "../../assets/img/lighthouseai_logo.png";

const BoardDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); //boardId
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});

    const [reviewList, setReviewList] = useState([]);
    const [content, setContent] = useState('');

    const [user, setUser] = useState('');

    const [review, setReview] = useState({
        id: '',
        content: '',
        isReviewUpdate: false
    });



    const getBoardDetailEach = async () => {
        console.log(id);
        const resp = await axios.get(`http://localhost:8080/api/v1/boards/${id}`);
        setBoard(resp.data);
        setLoading(false);
    };

    useEffect(() => {
        getBoardDetailEach();
    }, [])


    const moveToUpdate = () => {
        navigate('/board/update/' + id);
    }

    const moveToList = () => {
        navigate('/board');
    };

    const isLogin = !!localStorage.getItem("accessToken");

    const gotoHome = () => {
        navigate('/');
    }
    const gotoLogin = () => {
        navigate('/login');
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
    const backToList = () => {
        navigate('/board');
    }
    const backToBoardDetail = () => {
        navigate('/boards/' + id);
    }

    const getReviewList = async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/boards/${id}/reviews`);
        setReviewList(res.data);
        const isLogin = !!localStorage.getItem("accessToken");
        if (isLogin) {
            const w = await api.get('/users/user');
            setUser(w.data.nickname);
        }
    }


    useEffect(() => {
        getReviewList();
    }, []);

    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await api.delete(`http://localhost:8080/api/v1/boards/${id}`)
                .then(() => {
                    alert('삭제되었습니다.');
                    navigate('/board');
                });
        }
    };

    const onChange = (event) => {
        const { value, name } = event.target;
        if (name === 'content') setContent(value);
    };

    const postReview = async (e) => {
        api.post(`http://localhost:8080/api/v1/boards/${id}/reviews/create`, {
            content: content,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (!res.status === 200) throw new Error('서버 오류 발생');
                alert('댓글 등록에 성공하였습니다.');
                setContent(" ")
                getReviewList();
            })
            .catch(e => {
                console.error("댓글 작성 실패", e);
                alert('댓글 등록에 실패하였습니다.');
                getReviewList();
            })
    }

    const deleteReview = async (reviewId) => {
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            await api.delete(`http://localhost:8080/api/v1/reviews/${reviewId}`)
                .then((res) => {
                    alert('삭제되었습니다.');
                    getReviewList();
                    navigate('/boards/' + id);
                })
                .catch((error) => {
                    console.error('댓글 삭제 실패', error);
                    alert('댓글 삭제에 실패하였습니다.');
                });
        }
    };

    const [isEditing, setIsEditing] = useState({});
    const [editedContent, setEditedContent] = useState({});
    const handleReviewChange = (e, index) => {
        const newContent = e.target.value;
        setEditedContent((prev) => ({
            ...prev,
            [index]: newContent
        }));
    };

    const handleIsReviewUpdate = (reviewId) => {
        setIsEditing((prev) => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));
    };

    const updateReview = async (reviewId, index) => {
        const updatedReviews = reviewList.map((review, idx) => {
            if (idx === index) {
                return { ...review, content: editedContent[index] || review.content };
            }
            return review;
        });
        setReviewList(updatedReviews);
        await api.put(`http://localhost:8080/api/v1/reviews/${reviewId}`, {
            content: updatedReviews[index].content,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                alert('수정되었습니다.');
                getReviewList();
                navigate('/boards/' + id);
            })
            .catch((error) => {
                console.error('댓글 수정 실패', error);
                alert('댓글 수정에 실패하였습니다.');
            });
        setIsEditing((prev) => ({
            ...prev,
            [reviewId]: false
        }));
    };

    return (
        <div>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <div className='board'>
                    <div className='board-left'>
                        <div className="board-left-upper">
                            <div className='board-logo'>
                                <img src={lighthouseaiLogo} alt="로고" height={"60px"} id='board-logo' onClick={gotoHome}></img>
                            </div>
                            <div className='board-category'>
                                <button className="board-board" onClick={gotoBoard}>자유게시판</button>
                                {isLogin && <button className="board-board" onClick={gotoMyBoard}>내 게시물</button>}
                                {isLogin && <button className="board-board" onClick={gotoMyPage}>내 페이지</button>}
                                {isLogin && <button className="board-board" onClick={gotoMyTravelContent}>내 방문지</button>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <BoardDetailEach
                            id={board.boardId}
                            title={board.title}
                            content={board.content}
                            nickname={board.nickname}
                            image_url={board.image_url}
                        />
                        <div style={{ marginLeft: "20%" }}>
                            <             div style={{ marginTop: "3%" }}></div>
                            <button onClick={moveToUpdate}>수정</button>
                            <button onClick={deleteBoard}>삭제</button>
                            <button onClick={moveToList}>목록</button>
                        </div>

                        <div style={{ marginLeft: "20%", width: '90%' }}>
                            <div style={{ marginTop: "10%", width: '100%' }}></div>
                            <hr />
                            <input
                                name="content"
                                type="text"
                                placeholder="댓글을 작성하세요"
                                value={content}
                                onChange={onChange}
                            //onChange={(e) => setReview(e.target.value)}
                            />
                            <button onClick={() => postReview()}>댓글 작성</button>
                            <table>
                                <tbody>
                                    <div style={{ marginTop: "20%" }}></div>
                                    {reviewList.slice().reverse().map((review, index) => (
                                        <tr key={review.id}>
                                            <td style={{ listStyleType: 'none', paddingBottom: '1px', height: '1px' }}>
                                                {isEditing[review.id] ? (
                                                    <div>
                                                        <tr style={{ textAlign: 'left', fontSize: '10px' }}>{review.writer}</tr>
                                                        <input
                                                            type="text"
                                                            value={editedContent[index] || review.content}
                                                            onChange={(e) => handleReviewChange(e, index)}
                                                            style={{ textAlign: 'left', fontSize: '15px', width: '100%', height: '10px' }}
                                                        />
                                                        <button onClick={() => updateReview(review.id, index)}>등록</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <tr style={{ textAlign: 'left', fontSize: '10px' }}>{review.writer}</tr>
                                                        <tr style={{ textAlign: 'left', fontSize: '15px', width: '100%', height: '10px' }}>{review.content}</tr>
                                                        {review.writer === user && (
                                                            <div style={{ paddingLeft: "40%" }}>
                                                                <button onClick={() => handleIsReviewUpdate(review.id)}>수정</button>
                                                                <button onClick={() => deleteReview(review.id)}>삭제</button>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                                <hr style={{ color: "lightGray", width: '100%' }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardDetail;

