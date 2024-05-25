import React from "react";
import HeartImg from "../../assets/img/FullHeart.png";
import EmptyHeartImg from "../../assets/img/EmptyHeart.png";

const HeartButton = ({ like, onClick }) => {
    const heartStyle = {
        cursor: 'pointer',
        width: '24px',
        height: '24px',
    };

    return (
        <img
            src={like ? HeartImg : EmptyHeartImg}
            onClick={onClick}
            style={heartStyle}
        />
    );
};

export default HeartButton;