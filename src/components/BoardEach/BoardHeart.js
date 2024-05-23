import React, { useState, useEffect } from "react";


import HeartImg from "../../assets/img/FullHeart.png";
import EmptyHeartImg from "../../assets/img/EmptyHeart.png";




const HeartButton = ({ like, onClick }) => {
    // 인라인 스타일 객체
    const heartStyle = {
        cursor: 'pointer',
        width: '24px', // 예시로 넣은 크기입니다. 실제 필요에 맞게 조정하세요.
        height: '24px', // 예시로 넣은 크기입니다. 실제 필요에 맞게 조정하세요.
        // 추가하고 싶은 스타일 속성들을 여기에 정의하세요.
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
