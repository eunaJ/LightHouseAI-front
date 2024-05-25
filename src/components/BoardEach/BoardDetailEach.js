import React from 'react';

const BoardDetailEach = ({ id, title, content, nickname, image_url }) => {
    return (
        <div style={{ marginLeft: "20%",width: '100%'  }}>
            <div style={{ marginTop: "30%" }}></div>
            <h1 >{title}</h1>
            <hr style={{ width: '100%' }} />
            <h5 style={{ fontSize: "10px" }}>{nickname}</h5>   
            <p style={{ fontSize: "20px" }}>{content}</p>
            <img src={image_url} width='400px' />
        </div>
    );
};

export default BoardDetailEach;