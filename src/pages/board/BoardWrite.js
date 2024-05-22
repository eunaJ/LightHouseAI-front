import React, { useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅을 사용합
import "./BoardWrite.css"; 
import axios from 'axios';
import lighthouseaiLogo from "../../assets/img/lighthouseai_logo.png"; // 로고 이미지를 임포트
import api from '../../components/RefreshApi';

const BoardWrite = () => {
  const isLogin = !!localStorage.getItem("accessToken"); // 로컬 스토리지에서 accessToken을 가져와 로그인 상태를 확인
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수를 초기화
  const [title, setTitle] = useState(''); // 제목 상태를 관리
  const [content, setContent] = useState(''); // 내용 상태를 관리
  const [file, setFile] = useState(''); // 파일 상태를 관리
  const [image_url, setImage_url] = useState('');
  const [image, setImage] = useState('');
  const upload = useRef();

  // 페이지 이동 함수들
  const gotoHome = () => navigate('/');
  const gotoBoard = () => navigate('/board');
  const gotoMyBoard = () => navigate('/myboard');
  const gotoMyPage = () => navigate('/mypage');
  const gotoMyTravelContent = () => navigate('/mytravelcontent');
  const backToList = () => navigate('/board');
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const image= upload.current.files[0];
         setImage(image);
         const reader = new FileReader();
         reader.readAsDataURL(image);
         reader.onload = () => {
          setImage_url(reader.result);
        };
    
  };

  const onChange = (event) => {
    const { value, name } = event.target;
    if (name === 'title') setTitle(value);
    else if (name === 'content') setContent(value);
    else if (name == 'image_url') setImage_url(value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const controllerRequestDto ={"title" : title , "content":content};
    formData.append("controllerRequestDto",new Blob([JSON.stringify(controllerRequestDto)],{ type: 'application/json' }));
    //formData.append('controllerRequestDto', controllerRequestDto);
    
    if (file) {
      formData.append('multipartFile', file);
      formData.append('image_url',image_url);
    }
    else {
      formData.append('multipartFile', new Blob(), '');
    }
        e.preventDefault();
        api.post('http://localhost:8080/api/v1/boards/create', formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
    })
      .then(res => {
        console.log(res);
        alert('게시글이 성공적으로 저장되었습니다.');
        navigate('/board')
       if (!res.status === 200) throw new Error('서버 오류 발생');
      })
      .catch(e => {
        console.error('게시글 등록에 실패하였습니다.');
        alert('게시글 등록에 실패하였습니다.');
      
    })
  };

  

  return (
    <div>
      <div className='board'>
        <div className='board-left'>
          <div className="board-left-upper">
            <div className='board-logo'>
              <img src={lighthouseaiLogo} alt="로고" height={"60px"} onClick={gotoHome}></img>
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

      <form onSubmit={handleSubmit}>
        <div>
        <input
          name="title"
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={onChange}
          rows="10"
          cols="50"
        />
        </div>
        <div>
        <textarea
          name="content"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={onChange}
          rows="10"
          cols="50"
        />
        </div>
        <label>파일:</label>
        <input
          className = "boardimg-input"
          type="file"
          accept=".png, .jpeg, .jpg"
          ref={upload}
          onChange={handleFileChange}
          
        />
        <button type="submit">게시글 등록</button>
        <button onClick={backToList}>취소</button>
      </form>
    </div>
  );
};

export default BoardWrite;