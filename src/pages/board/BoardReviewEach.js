import React, { useState } from 'react';
import axios from 'axios';
import api from '../../components/RefreshApi';
import { useEffect } from "react";

const BoardReviewEach = ({id}) => {
  const getBoard = async () => {
    const res = await axios.get('http://localhost:8080/api/v1/boards');
    console.log(res.data);
    //setBoard(res.data);
    //console.log(board);
}
useEffect(() => {
  getBoard();

}, []);

  const [content, setContent] = useState('');

  const onChange = (event) => {
    const { value, name } = event.target;
    if (name === 'content') setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const controllerRequestDto ={"content":content};
    formData.append("controllerRequestDto",new Blob([JSON.stringify(controllerRequestDto)],{ type: 'application/json' }));
      api.post("http://localhost:8080/api/v1/boards/${id}/reviews/create", formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
      },
})// 이 부분은 백엔드에서 요구하는 요청 본문 형식에 맞춰서 수정해야 합니다.
    .then(res => {
        console.log(res);
        setContent('');
        if (!res.status === 200) throw new Error('서버 오류 발생');
        //onReviewAdded(); // 댓글 추가 후 목록 새로고침을 위한 콜백
    })
    .catch (e => {
      //console.error("댓글 작성 실패", error);
      alert('댓글 등록에 실패하였습니다.');
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={onChange}
        //onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 작성하세요"
        ows="10"
        cols="50"
      />
      <button type="submit">댓글 작성</button>
    </form>
  );
};

export default BoardReviewEach;
