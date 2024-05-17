import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import BoardDetailEach from "../../components/BoardEach/BoardDetailEach";


const BoardDetail = () => {

    const { boardId } = useParams(); // /board/:id와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const getBoardDetailEach = async () => {
        const resp =  await axios.get('http://localhost:8080/api/v1/boards/?{boardId}');
        setBoard(resp.data);
        setLoading(false);
    };
  
    useEffect(() => {
        getBoardDetailEach();
    }, [])


    return (
        <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <BoardDetailEach
          id={board.boardId}
          title={board.title}
          contents={board.contents}
          nickname={board.nickname}
        />
      )}
    </div>
    );

};

export default BoardDetail;