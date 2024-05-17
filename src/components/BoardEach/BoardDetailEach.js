import React from 'react';

const BoardDetailEach = ({ id, title, contents, nickname }) => {
    return (
        <div>
            <h2>{title}</h2>
            <h5>{contents}</h5>
            <hr />
            <p>{contents}</p>
        </div>
    );
};

export default BoardDetailEach;