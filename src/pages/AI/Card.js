import React from 'react';
import './Card.css';
import lighthouseaiLogo from "../../assets/img/lighthouseai_logo.png";

const Card = ({ item, onClick }) => {

    // const imageUrl = item.image_url || lighthouseaiLogo;
    console.log(item.image_url);

    return (
        <div className="card">
            <div className="card-img">
                {item.image_url && ['.png', '.jpeg', '.jpg'].some(ext => item.image_url.includes(ext)) ? (
                    <img src={item.image_url} alt="item" style={{ width: "100%", maxHeight: "100%" }} />
                ) : (
                    <img src={lighthouseaiLogo} alt="기본 이미지" style={{ width: "100%", maxHeight: "100%" }} />
                )}
            </div>
            <div className='card-star'>
                {'★'.repeat(item.star)}
            </div>
            <div className='card-content'>
                <div className='card-title'>
                    {item.title}
                </div>
                <div className='card-context'>
                    Serving: {item.serving}<br />
                    Travel Expense: {item.travel_expense}
                </div>
                <button onClick={onClick}>더보기</button>
            </div>
        </div>
    );
};

export default Card;
