import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const BoardDetailEach = ({ id, title, content, nickname, image_url }) => {
    return (
        <div style={{ marginLeft: "20%" }}>
            <div style={{ marginTop: "30%" }}></div>
            <h1>{title}</h1>
            <hr />
            <h5>{nickname}</h5>
            <p>{content}</p>
            <img src={image_url} width='400px' />
        </div>
    );
};

export default BoardDetailEach;