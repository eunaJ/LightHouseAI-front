import React, { useState, useEffect } from "react";


import HeartImg from "../../assets/img/FullHeart.png";
import EmptyHeartImg from "../../assets/img/EmptyHeart.png";


const HeartButton = ({ like, onClick }) => {
    // 인라인 스타일 객체
    const heartStyle = {
        cursor: 'pointer',
        width: '24px', 
        height: '24px', 
    };

    return (
        <img 
            src={like ? HeartImg : EmptyHeartImg} 
            onClick={onClick} 
            style={heartStyle} // 인라인 스타일 적용
        />
    );
};

export default HeartButton;
