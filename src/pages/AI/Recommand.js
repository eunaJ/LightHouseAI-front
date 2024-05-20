import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import lighthouseaiLogo from "../../assets/img/lighthouseai_logo.png"
import './Recommand.css';
import { useState } from 'react';
import axios from 'axios';

const Recommand = () => {
    const navigate = useNavigate();
    const gotoHome = () => {
        navigate('/');
    }
    const [userInput, setUserInput] = useState('');
    const getQuery = (e) => {
        setUserInput(e.target.value);
    }
    const [response, setResponse] = useState([]);
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        //textRef.current.style.height = textRef.current.scrollHeight + "px";
    },[]);
    const onCLickQueryInput = async(e) => {
        e.preventDefault();
        const res = await axios.post(
            `http://localhost:8080/api/v1/run_command`,
            {
                'command' : "run_script",
                'msg' : userInput,
            }
        );
        console.log(res);
        setResponse(res.data.response);
    };
    return (
        <div className="recommand">
            <div className="recommand-left">
                <div className="recommand-left-upper">
                    <div recommand-logo>
                        <img src={lighthouseaiLogo} alt="로고" height={"60px"} id='home-logo' onClick={gotoHome}></img>
                    </div>
                </div>
            </div>
            <div className= "box-container">
                <div className = "box">
                    <div className = "box-title">
                        <h1>여행지 추천</h1>
                    </div>
                    <div className = "box-content">
                        <ul>
                            {response.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className = "query">
                    <textarea ref={textRef} onInput={handleResizeHeight} onChange={getQuery} placeholder="여행지를 입력해주세요"></textarea>
                    <button onClick={onCLickQueryInput}
                    disable={userInput.length === 0}
                    >검색
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Recommand;