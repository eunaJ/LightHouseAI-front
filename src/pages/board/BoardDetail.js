import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import BoardDetailEach from "../../components/BoardEach/BoardDetailEach";


const BoardDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const getBoardDetailEach = async () => {
      console.log(id);
      const resp = await axios.get(`http://localhost:8080/api/v1/boards/${id}`);
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
          id={board.id}
          title={board.title}
          contents={board.contents}
          nickname={board.nickname}
        />
      )}
    </div>
    );

};

export default BoardDetail;