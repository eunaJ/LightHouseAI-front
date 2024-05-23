import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../components/RefreshApi';
import "./Board.css";
import axios from 'axios';
import BoardDetailEach from "../../components/BoardEach/BoardDetailEach";
import lighthouseaiLogo from "../../assets/img/lighthouseai_logo.png";
import HeartButton from '../../components/BoardEach/BoardHeart';

const BoardDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); //boardId
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0);
    let [like, setLike] = useState(0)




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
        setLiked(resp.data.liked)
        setBoard(resp.data);
        setLoading(false);
    };


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

     /*useEffect(() => {
        getBoardDetailEach();
    }, [id])*/

    useEffect(() => {
        getBoardDetailEach();
    }, []);

    
   /*useEffect(() => {
        getBoardDetailEach();
    }, [id])*/

   /*
    useEffect(() => {
        getBoardDetailEach();
    }, []);

    
    useEffect(() => {
        // 보드 디테일 정보와 좋아요 상태를 가져옵니다.
        const fetchBoardAndLikes = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/api/v1/boards/${id}`);
                setLiked(resp.data.liked);
                setLikesCount(resp.data.likesCount);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBoardAndLikes();
    }, [id]);

    const handleLike = async () => {
        try {
            if (liked) {
                // 좋아요 취소 요청
                await axios.delete(`http://localhost:8080/api/v1/boards/${id}/like`);
                setLikesCount(prev => prev - 1);
            } else {
                // 좋아요 추가 요청
                await axios.post(`http://localhost:8080/api/v1/boards/${id}/like`);
                setLikesCount(prev => prev + 1);
            }
            setLiked(!liked);
        } catch (error) {
            console.error(error);
        }
    }; 
*/
   /*  const postLike = async (e) => {
        api.post(`http://localhost:8080/api/v1/boards/${id}/likes`, {
            boardId: boardId,
            UserId: UerId,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (!res.status === 200) throw new Error('서버 오류 발생');
                else if(like.userid =userid) 
                alert('좋아요 등록에 성공하였습니다.');
                getLikeList();
            })
            .catch(e => {
                console.error("좋아요 등록 실패", e);
                alert(' 좋아요 추가에 실패하였습니다.');
                getReviewList();
            })
    }   

     
*/

    const handleLike = async () => {
        try {
            if (liked) {
                // 좋아요 취소 요청
                await axios.delete(`http://localhost:8080/api/v1/boards/${id}/like`);
                setLikesCount(prev => prev - 1);
            } else {
                // 좋아요 추가 요청
                await axios.post(`http://localhost:8080/api/v1/boards/${id}/like`);
                setLikesCount(prev => prev + 1);
            }
            setLiked(!liked);
        } catch (error) {
            console.error(error);
        }
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
                            <div style={{ marginTop: "3%" }}></div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                            <button onClick={moveToUpdate} className = "updateButton" style={{ marginRight:"2%" }}>수정</button>
                            <button onClick={deleteBoard} className = "deleteButton" style={{ marginRight:"2%" }}>삭제</button>
                            <button onClick={moveToList} className = "listButton" style={{ marginRight:"50%" }}>목록</button> 
                            <HeartButton like={like} onClick={handleLike}/> 
                            <span>{likesCount}</span>
                        </div>
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
                                style={{ width: '265px', height: '20px' }} 
                            />

                            <button onClick={() => postReview()} className = "reviewUpButton" style={{marginLeft: "7px"}}> 댓글 작성</button>
                            <table  style={{ marginTop: "6%" , width: '100%',}}>
                                <tbody>
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
                                                            style={{ textAlign: 'left', fontSize: '15px', height: '10px' }}
                                                        />
                                                        <button onClick={() => updateReview(review.id, index)}>등록</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <tr style={{ textAlign: 'left', fontSize: '13px' }}>{review.writer}</tr>
                                                        <tr style={{ display: 'flex', alignItems: 'center', fontSize: '20px'}}>
  <                                                     td style={{ flex: 1, textAlign: 'left' }}>{review.content}</td>
                                                                     {review.writer === user && (
                                                         <td>
                                                         <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
                                                         <button onClick={() => handleIsReviewUpdate(review.id)} className = "reviewButton">수정</button>
                                                         <button onClick={() => deleteReview(review.id)} className = "reviewButton" style={{marginTop: "8%"}}>삭제</button>
                                                         </div>
                                                         </td>
                                                         )}
                                                        </tr>

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

