import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./BoardWrite.css";
import  lighthouseaiLogo  from "../../assets/img/lighthouseai_logo.png"


const BoardWrite= () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);



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
  };

  const saveBoard = async () => {
    await axios.post(`http://localhost:8080/api/v1/boards/create`).
    then((res) => {
      alert('등록되었습니다.');
      navigate('/board');
    });
  };



  const isLogin = !!localStorage.getItem("accessToken");



  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("handleSubmit 호출됨");

    const formData = new FormData();
    formData.append('controllerRequestDto', new Blob([JSON.stringify({ title, content })], {
      type: "application/json"
    }));
      await axios.post('http://localhost:8080/api/v1/boards/create', formData, {
      });
      alert('게시물이 등록되었습니다.');
      navigate('/board');

  };


  return (

    <div>
      <form onSubmit={handleSubmit}>
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

          <label>제목:</label>
          <input type="text"
          textarea value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          rows="5"
          cols="50" 
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea value={content} 
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          cols="50" 
          />

        </div>
        <div>
          <label>파일:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button type="submit">등록</button>
        <button onClick={backToList}>취소</button>

      </form>
    </div>
  );
}

export default BoardWrite;
