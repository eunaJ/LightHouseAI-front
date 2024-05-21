import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const BoardDetailEach = ({ id, title, content, nickname, image_url}) => {
    

    const navigate = useNavigate();



    return (


        <div>
            <h2>{title}</h2>
            <h3>{nickname}</h3>
            <hr />
            <p>{content}</p>

            <img src={image_url} width = '400px'/>
           
        
         </div>
    );
};

export default BoardDetailEach;