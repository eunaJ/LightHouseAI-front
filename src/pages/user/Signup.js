import React, { useRef, useState } from 'react';
import { CiUser, CiCalendar } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUser, FaUserCircle } from "react-icons/fa";
import lighthouseaiLogo from '../../assets/img/lighthouseai_logo.png';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [pwdChk, setPwdChk] = useState('');
    const [birth, setBirth] = useState('');
    const [profileImg, setProfileImg] = useState('');

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [pwdErrorMsg, setPwdErrorMsg] = useState('');
    const [pwdChkErrorMsg, setPwdChkErrorMsg] = useState('');
    const [nicknameErrorMsg, setNicknameErrorMsg] = useState('');

    const [isEmail, setIsEmail] = useState(false);
    const [isPwd, setIsPwd] = useState(false);
    const [isPwdchk, setIsPwdchk] = useState(false);
    const [isNickname, setIsNickname] = useState(false);

    const upload = useRef();

    const gotoHome = () => {
        navigate('/');
    }

    const handleProfileImgChange = (e) => {
        console.log(upload.current.files);
        // setProfileImg(URL.createObjectURL(upload.current.files[0]));
        setProfileImg(upload.current.files[0]);
    };

    function validEmail(value) {
        return /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/.test(value);
    }

    function validPassword(value) {
        return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/.test(value);
    }

    const handleEmailChange = (e) => {
        const value = e.target.value.trim();
        setEmail(value);
        if (!validEmail(value)) {
            setEmailErrorMsg('올바른 이메일 형식으로 작성해주세요.');
            setIsEmail(false);
        }
        else {
            axios.post('http://localhost:8080/api/v1/users/isnotdupemail', {
                email: value,
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => {
                    setEmailErrorMsg('');
                    setIsEmail(true);
                })
                .catch(error => {
                    let status = error.response.status;
                    console.error('Error:', error.response.status);
                    if (status === 400) {
                        setEmailErrorMsg('다른 이메일을 사용해주세요.');
                        setIsEmail(false);
                    }
                    else {
                        setEmailErrorMsg('오류가 발생했습니다. 다시 시도해주세요.');
                        setIsEmail(false);
                    }
                });
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value.trim();
        if (value.length < 8) {
            setPwdErrorMsg('8자 이상의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.');
        }
        else if (!validPassword(value)) {
            setPwdErrorMsg('8자 이상의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.');
        }
        else {
            setPwdErrorMsg('');
            setIsPwd(true);
        }
        setPassword(value);
    }

    const handlePasswordChkChange = (e) => {
        const value = e.target.value.trim();
        if (value !== password) {
            setPwdChkErrorMsg('비밀번호가 달라요.');
        }
        else {
            setPwdChkErrorMsg('');
            setIsPwdchk(true);
        }
        setPwdChk(value);
    }

    const handleNicknameChange = (e) => {
        const value = e.target.value.trim();
        setNickname(value);
        if (value.length < 1) {
            setIsNickname(false);
        }
        axios.post('http://localhost:8080/api/v1/users/isnotdupnick', {
            nickname: value,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                setNicknameErrorMsg('');
                setIsNickname(true);
            })
            .catch(error => {
                let status = error.response.status;
                console.error('Error:', error.response.status);
                if (status === 400 || status === 403) {
                    setNicknameErrorMsg('다른 닉네임을 사용해주세요.');
                    setIsNickname(false);
                }
                else {
                    setNicknameErrorMsg('오류가 발생했습니다. 다시 시도해주세요.');
                    setIsNickname(false);
                }
            });
    };

    const handleBirthChange = (e) => {
        setBirth(e.target.value)
    };

    const navigate = useNavigate();

    const processSignUp = (e) => {
        const formData = new FormData();
        const userData = {
            "email": email,
            "password": password,
            "confirmPassword": pwdChk,
            "nickname": nickname,
            "birth": birth
        };
        formData.append("controllerRequestDto", new Blob([JSON.stringify(userData)], { type: "application/json" }));
        formData.append("multipartFile", profileImg);
        e.preventDefault();
        axios.post('http://localhost:8080/api/v1/users/signup', formData, {
            headers: {
                "Content-Type": "multipart/form-data;",
            },
        })
            .then(res => {
                console.log(res.status);
                console.log(res);
                if (res.status === 201) {
                    console.log('회원가입 성공!');
                    alert('회원가입에 성공했어요!');
                    navigate('/login');
                }
            })
            .catch(e => {
                console.log('회원가입 실패');
                alert(e.response.data.message);
                navigate('/signup');
            })
    };

    return (
        <div className='signup'>
            <div className='signup-inner'>
                <div className='signup-logo'>
                    <img src={lighthouseaiLogo} alt="로고" height={"120px"} id='lighthouseaiLogo' onClick={gotoHome}></img>
                </div>
                <form className="signup-form">
                    <div className="signup-userinfo-form">
                        <p className="signup-userinfo-text">기본 정보</p>
                        <div className='signup-email' id="email">
                            <CiUser className='signup-email-icon' />
                            <input
                                type="text"
                                placeholder='이메일'
                                value={email}
                                name="email"
                                id="emailSignup"
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        {emailErrorMsg && <div style={{ color: 'red', fontSize: '10px', marginTop: '5px', marginLeft: '27px' }}>{emailErrorMsg}</div>}
                        <div className='signup-pwd'>
                            <RiLockPasswordLine className='signup-pwd-icon' />
                            <input
                                type="password"
                                minLength="8"
                                placeholder='비밀번호'
                                value={password}
                                name="password"
                                id="pwdSignup"
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        {pwdErrorMsg && <div style={{ color: 'red', fontSize: '10px', marginTop: '5px', marginLeft: '27px' }}>{pwdErrorMsg}</div>}
                        <div className='signup-pwdchk'>
                            <RiLockPasswordLine className='signup-pwdchk-icon' />
                            <input
                                type="password"
                                minLength="8"
                                placeholder='비밀번호 확인'
                                value={pwdChk}
                                onChange={handlePasswordChkChange}
                                name="passwordConfirm"
                                id="pwdSignup"
                                required
                            />
                        </div>
                        {pwdChkErrorMsg && <div style={{ color: 'red', fontSize: '10px', marginTop: '5px', marginLeft: '27px' }}>{pwdChkErrorMsg}</div>}
                        <div className='signup-nickname'>
                            <FaUser className='signup-nickname-icon' />
                            <input
                                type="text"
                                maxLength="20"
                                placeholder='닉네임'
                                value={nickname}
                                onChange={handleNicknameChange}
                                name="nickname"
                                id="nickSignup"
                                required
                            />
                        </div>
                        {nicknameErrorMsg && <div style={{ color: 'red', fontSize: '10px', marginTop: '5px', marginLeft: '27px' }}>{nicknameErrorMsg}</div>}
                        <hr id="hrSignup"></hr>
                        <p className="signup-info-optional">선택 사항</p>
                        <div className='signup-birth'>
                            <CiCalendar className='signup-birth-icon' />
                            <input
                                type="date"
                                placeholder='생일'
                                value={birth}
                                name="birth"
                                onChange={handleBirthChange}
                                id="birthSignup"
                            />
                        </div>
                        <div className="signup-profileimg">
                            <FaUserCircle className='signup-profileimg-icon' />
                            <label className="signup-profileimg-btn">
                                <input
                                    className="signup-profileimg-input"
                                    type="file"
                                    accept=".png, .jpeg, .jpg"
                                    ref={upload}
                                    onChange={handleProfileImgChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='signup-btn'>
                        <button id="SignupBut"
                            onClick={processSignUp} disabled={!isEmail || !isNickname || !isPwd || !isPwdchk}>회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;