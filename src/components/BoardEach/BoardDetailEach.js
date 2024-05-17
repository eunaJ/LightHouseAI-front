import React from 'react';





const BoardDetailEach = ({ boardId, title, content, nickname }) => {

    return (


        <div>
            <h2>{title}</h2>
            <h5>{nickname}</h5>
            <hr />
            <p>{content}</p>
        </div>
    );
};

export default BoardDetailEach;