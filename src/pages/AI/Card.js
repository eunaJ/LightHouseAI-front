import React from 'react';
import './Card.css';

const Card = ({ item, onClick }) => (
    <div className="card">
        <div className="card-img">
            <img src={item.image_url} alt="Item" />
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

export default Card;
