import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lighthouseaiLogo from "../../assets/img/lighthouseai_logo.png";
import './Recommand.css';
import axios from 'axios';
import Card from './Card'; // Card 컴포넌트 임포트

const Recommand = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);
    const navigate = useNavigate();

    const gotoHome = () => {
        navigate('/');
    };

    const sendMessage = async () => {
        setLoading(true);
        if (input !== '') {
            setMessages([...messages, input]);
            try {
                const res = await axios.post(
                    `http://localhost:8080/api/v1/run_command`,
                    {
                        'command': "run_script",
                        'msg': input,
                    }
                );
                console.log(res.data);
                setData(res.data.response);
            } catch (error) {
                alert('AI가 요청을 이해하지 못했습니다. 다시 시도해주세요.');
            } finally {
                setInput('');
                setLoading(false);
            }
        }
    };

    const handleCardClick = async (item) => {
        setLoading(true);
        try {
            const res = await axios.post(
                `http://localhost:8080/api/v1/run_command`,
                {
                    'command': "travelList",
                    'id': item.id
                }
            );
            setSelectedItemDetails(res.data.response);
        } catch (error) {
            alert('정보를 가져오는 데 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recommand">
            <div className="recommand-left">
                <div className="recommand-left-upper">
                    <div className="recommand-logo">
                        <img src={lighthouseaiLogo} alt="로고" id="home-logo" onClick={gotoHome} />
                    </div>
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div key={index} className="message-bubble">
                                {message}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-input-container">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        type="text"
                        placeholder="Type a message"
                    />
                    <button onClick={sendMessage} disabled={loading}>
                        Send
                    </button>
                </div>
            </div>
            <div className="card-container">
                {loading ? <div>Loading...</div> : data.map((item, index) => (
                    <Card key={index} item={item} onClick={() => handleCardClick(item)} />
                ))}
            </div>
            <div className="details-container">
                {selectedItemDetails && (
                    <div className="details-content">
                        <h2>{selectedItemDetails.travel[0].title}</h2>
                        {selectedItemDetails.travel[0].image_url && ['.png', '.jpeg', '.jpg'].some(ext => selectedItemDetails.travel[0].image_url.includes(ext)) ? (
                            <img src={selectedItemDetails.travel[0].image_url} alt={selectedItemDetails.travel[0].title} style={{ width: "100%", maxHeight: "100%" }} />
                        ) : (
                            <img src={lighthouseaiLogo} alt="기본 이미지" style={{ width: "100%", maxHeight: "100%" }} />
                        )}
                        <p>Serving: {selectedItemDetails.travel[0].serving}</p>
                        <p>Travel Expense: {selectedItemDetails.travel[0].travel_expense}</p>
                        <p>Star: {selectedItemDetails.travel[0].star}</p>
                        <h3>카페</h3>
                        {selectedItemDetails.cafe.map((cafe, index) => (
                            <div key={index}>
                                <p>Name : {cafe.title}</p>
                                <p>Location: {cafe.location}</p>
                                <p>Menu: {cafe.menu}</p>
                                <p>Price: {cafe.price}</p>
                            </div>
                        ))}
                        <h3>음식점</h3>
                        {selectedItemDetails.restaurant.map((restaurant, index) => (
                            <div key={index}>
                                <p>Name : {restaurant.title}</p>
                                <p>Location: {restaurant.location}</p>
                                <p>Menu: {restaurant.menu}</p>
                                <p>Price: {restaurant.price}</p>
                            </div>
                        ))}
                        <h3>쇼핑몰</h3>
                        {selectedItemDetails.shopping.map((shopping, index) => (
                            <div key={index}>
                                <p>Name : {shopping.title}</p>
                                <p>Location: {shopping.location}</p>
                                <p>Price: {shopping.price}</p>
                            </div>
                        ))}
                        <h3>관광지</h3>
                        {selectedItemDetails.tourist.map((tourist, index) => (
                            <div key={index}>
                                <p>Name : {tourist.title}</p>
                                <p>Location: {tourist.location}</p>
                                <p>Price: {tourist.price}</p>
                            </div>
                        ))}
                        <h3>기타서비스</h3>
                        {selectedItemDetails.other.map((other, index) => (
                            <div key={index}>
                                <p>Name : {other.title}</p>
                                <p>Location: {other.location}</p>
                                <p>Price: {other.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommand;
