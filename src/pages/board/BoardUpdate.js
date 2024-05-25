import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';// 페이지 이동을 위해 useNavigate 훅을 사용합
import "./BoardWrite.css";
import axios from 'axios';
import lighthouseaiLogo from "../../assets/img/lighthouseai_logo.png";
import api from '../../components/RefreshApi';

const BoardUpdate = () => {
  const isLogin = !!localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // 제목 상태를 관리
  const [content, setContent] = useState(''); // 내용 상태를 관리
  const [file, setFile] = useState(''); // 파일 상태를 관리
  const [image_url, setImage_url] = useState('');
  const [image, setImage] = useState('');
  const upload = useRef();
  const [imageChange, setImageChange] = useState(false);

  const { id } = useParams();

  const getBoardDetailEach = async () => {
    const resp = await axios.get(`http://localhost:8080/api/v1/boards/${id}`);
    setTitle(resp.data.title);
    setContent(resp.data.content);
    setImage_url(resp.data.image_url);

    setLoading(false);
  };

  useEffect(() => {
    getBoardDetailEach();
  }, [])

  // 페이지 이동 함수들
  const gotoHome = () => navigate('/');
  const gotoBoard = () => navigate('/board');
  const gotoMyBoard = () => navigate('/myboard');
  const gotoMyPage = () => navigate('/mypage');
  const gotoMyTravel = () => navigate('/mytravel');
  const backToList = () => navigate('/boards/' + id);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageChange(true);
  };

  const [loading, setLoading] = useState(true);

  const onChange = (event) => {
    const { value, name } = event.target;
    if (name === 'title') setTitle(value);
    else if (name === 'content') setContent(value);
  };
  const formData = new FormData();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      formData.append('multipartFile', file);
      setImageChange(true);
      formData.append('image_url', image_url);
    }
    else {
      formData.append('multipartFile', new Blob(), '');
      setImageChange(false);
      formData.append('image_url', new Blob(), '');
    }
    const controllerRequestDto = { "title": title, "content": content, "imageChange": imageChange };
    formData.append("controllerRequestDto", new Blob([JSON.stringify(controllerRequestDto)], { type: 'application/json' }));
    e.preventDefault();

    if (imageChange) {
      if (image) {
        formData.append("multipartFile", image)
        formData.append('image_url', image_url);
      }
      else {
        formData.append('multipartFile', new Blob(), '');
      }
    }
    api.put('http://localhost:8080/api/v1/boards/' + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        alert('게시글이 성공적으로 수정되었습니다.');
        navigate('/boards/' + id)
        if (!res.status === 200) throw new Error('서버 오류 발생');
      })
      .catch(e => {
        console.error('게시글 수정에 실패하였습니다.');
        alert('게시글 수정에 실패하였습니다.');
      })
  };

  return (
    <div>
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
              {isLogin && <button className="board-board" onClick={gotoMyTravel}>내 방문지</button>}
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "10%" }}>
          <div style={{ marginTop: "25%" }}></div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="title"
                type="text"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={onChange}
                style={{ width: '200px', height: '20px' }}
              />
            </div>
            <div>
              <div style={{ marginTop: "2%" }}></div>
              <textarea
                name="content"
                placeholder="내용을 입력해주세요"
                value={content}
                onChange={onChange}
                wrap="hard"
                style={{ width: '30vw', height: '50vh', overflow: 'auto', resize: 'none' }}
              />
            </div>
            <label>파일:</label>
            <input
              className="boardimg-input"
              type="file"
              accept=".png, .jpeg, .jpg"
              ref={upload}
              onChange={handleFileChange}
            />
            <button type="submit" className='BoardUpdateButton'>게시글 수정</button>
            <button onClick={backToList} className='BoardUpdateDeleteButton'>취소</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BoardUpdate;