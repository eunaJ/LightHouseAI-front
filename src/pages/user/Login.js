import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lighthouseaiLogo from '../../assets/img/lighthouseai_logo.png';
import { CiUser } from 'react-icons/ci';
import { RiLockPasswordLine } from 'react-icons/ri';
import './Login.css';
import kakaoLoginImg from '../../assets/img/kakao_login_img.png';
import naverLoginImg from '../../assets/img/naver_login_img.png';
import axios from 'axios';

const Login = () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    // const [cookie, setCookie, removeCookie] = useCookies([]);

    const gotoHome = () => {
        navigate('/');
    }
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserInfo(userInfo => ({
            ...userInfo,
            [name]: value,
        }));
    };

    const navigate = useNavigate();
    const goToSignup = () => {
        navigate('/signup');
    }

    const handleKakaoLogin = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
    }

    const handleNaverLogin = () => {
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=${process.env.REACT_APP_NAVER_STATE}`;
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const loginProcess = (e) => {
        e.preventDefault();
        // removeCookie("refreshToken");
        axios.post('http://localhost:8080/api/v1/users/login', {
            email: userInfo.email,
            password: userInfo.password,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
            .then(res => {
                if (res.status === 200) {
                    //res.config.headers
                    // const token = res.data.token;
                    // res.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    let access = res.headers.get('Access-token');
                    // console.log(res.headers);
                    // console.log(document.cookie);
                    let refresh = res.headers.get('Set-Cookie');
                    localStorage.setItem('accessToken', access);
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${access}`;
                    axios.defaults.headers.common[
                        "refreshToken"
                    ] = `${refresh}`;
                    console.log('로그인 성공');
                    navigate('/');
                }
            })
            .catch(e => {
                console.error('로그인 실패');
                alert(e.response.data.message);
                navigate('/login');
            })
    };

    return (
        <div className='login'>
            <div className='login-inner'>
                <div className='login-logo'>
                    <img src={lighthouseaiLogo} alt="로고" height={"200px"} id='lighthouseaiLogo' onClick={gotoHome}></img>
                </div>
                <form className="login-form" onChange={handleInputChange}>
                    <div className='email' id="email">
                        <CiUser className='ciuser' />
                        <input
                            type="text"
                            placeholder='이메일'
                            value={userInfo.email}
                            name="email"
                            id="emailLogin"
                            required
                        />
                    </div>
                    <div>
                        <RiLockPasswordLine className='riLockPasswordLine' />
                        <input
                            type="password"
                            minlength="8"
                            placeholder='비밀번호'
                            value={userInfo.password}
                            name="password"
                            id="pwdLogin"
                            required
                        />
                    </div>
                    <div className='login-btn'>
                        <button id="LoginBtn"
                            onClick={loginProcess}>로그인</button>
                    </div>
                </form>
                <button id="signupBtn" onClick={goToSignup}>회원가입</button>
                <hr id="hrLogin"></hr>
                <div className='login-social-btn'>
                    <button id="kakaoLoginBt">
                        <img src={kakaoLoginImg} id="sLoginBt" alt="카카오로그인" onClick={handleKakaoLogin} ></img>
                    </button>
                    <button id="naverLoginBt">
                        <img src={naverLoginImg} id="sLoginBt" alt="네이버로그인" onClick={handleNaverLogin} ></img>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;