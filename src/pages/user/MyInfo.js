import { useState, useEffect, useRef } from 'react';
import { CiUser, CiCalendar } from 'react-icons/ci';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import initProfileImg from '../../assets/img/init_profile_img.png';
import './MyInfo.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../components/RefreshApi';
import lighthouseaiLogo from '../../assets/img/lighthouseai_logo.png';

const MyInfo = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [pwdChk, setPwdChk] = useState('');
    const [birth, setBirth] = useState('');
    const [profileImg, setProfileImg] = useState(initProfileImg);
    const [profileImgUrl, setProfileImgUrl] = useState('');
    const [currentNickname, setCurrentNickname] = useState(nickname);

    const navigate = useNavigate();
    const upload = useRef();

    const gotoHome = () => {
        navigate('/');
    }

    const handlerSaveMyInfo = (e) => {
        e.preventDefault();
        let updatedNickname = nickname;
        if (currentNickname === nickname) {
            updatedNickname = (currentNickname === nickname) ? '' : nickname;
        }

        const formData = new FormData();
        const updateUserData = {
            "newPassword": password,
            "confirmNewPassword": pwdChk,
            "nickname": updatedNickname,
            'ImageChange': isImgChange
        };
        formData.append("controllerRequestDto", new Blob([JSON.stringify(updateUserData)], { type: 'application/json' }));
        formData.append("multipartFile", profileImg);

        e.preventDefault();
        axios.put('http://localhost:8080/api/v1/users/update', formData, {
            headers: {
                // "Content-Type": "multipart/form-data;",
                'Authorization': localStorage.getItem('accessToken')
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log('정보 업데이트 성공');
                    alert('정보가 변경되었어요.');
                }
            })
            .catch((error) => {
                console.error('에러 발생', error);
                const msg = error.response.data;
                if (msg.status === 400) {
                    alert(msg.message);
                } else {
                    alert('다시 시도해주세요.');
                }
            });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('http://localhost:8080/api/v1/users/user', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('accessToken')
                    }
                });
                if (response.status === 200) {
                    const data = response.data;
                    setEmail(data.email);
                    setCurrentNickname(data.nickname);
                    setNickname(data.nickname);
                    setCurrentNickname(data.nickname);
                    setBirth(data.birth);
                    console.log(data);
                    if (data.profile_img_url === '' || data.profile_img_url === null || data.profile_img_url === undefined ||
                        data.profile_img_url === '/static/media/initialProfileImg.b31adf0c9ab904bf0899.png') {
                        setProfileImg(initProfileImg);
                        setProfileImgUrl(initProfileImg);
                    } else {
                        setProfileImg(data.profile_img_url);
                        setProfileImgUrl(data.profile_img_url);
                    }
                }
            } catch (error) {
                console.error('데이터 가져오기에 실패했습니다.', error);
            }
        };
        fetchData();
    }, []);

    const emailErrorMsg = "이메일은 변경할 수 없어요.";
    const [pwdErrorMsg, setPwdErrorMsg] = useState();
    const [pwdChkErrorMsg, setPwdChkErrorMsg] = useState();
    const [nicknameErrorMsg, setNicknameErrorMsg] = useState();
    const birthErrorMsg = "생일은 변경할 수 없어요.";
    const [isPwd, setIsPwd] = useState(true);
    const [isImgChange, setIsImgChange] = useState(false);

    const handleProfileImgChange = (e) => {
        if (upload.current && upload.current.files) {
            setIsImgChange(true);
            const img = upload.current.files[0];
            setProfileImg(img);
            //이미지 미리보기 기능
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = () => {
                setProfileImgUrl(reader.result);
            };
            console.log(img);
            e.target.value = '';
        }
    };

    const handleProfileImgClear = e => {
        setProfileImg(initProfileImg);
        setProfileImgUrl(initProfileImg); 
        setIsImgChange(true);
    }

    function validPassword(value) {
        return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/.test(value);
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value.trim();
        if (!validPassword(value)) {
            setPwdErrorMsg('8자 이상의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.');
            setIsPwd(false);
        }
        if (value.length < 8) {
            setPwdErrorMsg('8자 이상의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.');
            setIsPwd(false);
        }
        else {
            setIsPwd(true);
            setPwdErrorMsg('');
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
        }
        setPwdChk(value);
    }
    const handleNicknameChange = (e) => {
        const value = e.target.value.trim();
        setNickname(value);
        axios.post('http://localhost:8080/api/v1/users/isnotdupnick', {
            nickname: value,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                setNicknameErrorMsg('');
            })
            .catch(error => {
                let status = error.response.status;
                console.error('Error:', error.response.status);
                if (status === 400 || status === 403) {
                    if (currentNickname !== value) {
                        setNicknameErrorMsg('다른 닉네임을 사용해주세요.');
                    }
                }
                else {
                    setNicknameErrorMsg('오류가 발생했습니다. 다시 시도해주세요.');
                }
            });
    }

    return (
        <div className='myinfo'>
            <div className='myinfo-upper'>
                <div className='myinfo-home-logo'>
                    <img src={lighthouseaiLogo} alt="등대 로고" height={"70px"} width={"110px"} id='myinfo-home-logo' onClick={gotoHome}></img>
                </div>
            </div>
            <div className='myinfo-inner'>
                <div className='myinfo-profileimg'>
                    <div className='myinfo-inner-top'>
                        <label htmlFor="myinfo-profileimg-input">
                            <img
                                src={profileImgUrl}
                                alt="이미지 업로드"
                                id="profileImgMyInfo"
                            />
                        </label>
                        <input
                            type="file"
                            id="myinfo-profileimg-input"
                            name="myinfo-profileimg"
                            accept=".png, .jpeg, .jpg"
                            onChange={handleProfileImgChange}
                            ref={upload}
                        />
                    </div>
                    <div className='myinfo-update-profileimg-btn'>
                        <button id="updateProfileImgMyinfoBt" onClick={handleProfileImgClear}>사진 삭제</button>
                    </div>
                </div>
                <form className="myinfo-update-userform">
                    <div className="myinfo-update-user">
                        <div className='myinfo-email' id="email">
                            <CiUser className='myinfo-email-icon' />
                            <input
                                type="text"
                                placeholder={email}
                                value={email}
                                name="email"
                                id="emailMyinfo"
                                readOnly
                            />
                        </div>
                        {emailErrorMsg && <div style={{ color: 'red', fontSize: '10px', marginTop: '5px', marginLeft: '10px' }}>{emailErrorMsg}</div>}
                        <div className='myinfo-pwd'>
                            <RiLockPasswordLine className='myinfo-pwd-icon' />
                            <input
                                type="password"
                                placeholder='비밀번호'
                                value={password}
                                name="password"
                                id="pwdMyinfo"
                                onChange={handlePasswordChange}
                            />
                        </div>
                        {pwdErrorMsg && <div style={{ color: 'red', fontSize: '10px', marginTop: '5px', marginLeft: '10px' }}>{pwdErrorMsg}</div>}
                        <div className='myinfo-pwdchk'>
                            <RiLockPasswordLine className='myinfo-pwdchk-icon' />
                            <input
                                type="password"
                                placeholder='비밀번호 확인'
                                value={pwdChk}
                                onChange={handlePasswordChkChange}
                                name="passwordConfirm"
                                id="pwdMyinfo"
                                required
                            />
                        </div>
                        {pwdChkErrorMsg && <div style={{ color: 'red', fontSize: '10px', marginTop: '5px', marginLeft: '10px' }}>{pwdChkErrorMsg}</div>}
                        <div className='myinfo-nickname'>
                            <FaUser className='myinfo-nickname-icon' />
                            <input
                                type="text"
                                placeholder='닉네임'
                                value={nickname}
                                onChange={handleNicknameChange}
                                id="nicknameMyinfo"
                                name="nickname"
                            />
                        </div>
                        {nicknameErrorMsg && <div style={{ color: 'red', fontSize: '10px', marginTop: '5px', marginLeft: '10px' }}>{nicknameErrorMsg}</div>}
                        <div className='myinfo-birth'>
                            <CiCalendar className='myinfo-birth-icon' />
                            <input
                                type="date"
                                placeholder={birth}
                                value={birth}
                                name="birth"
                                id="birthMyinfo"
                                readOnly
                            />
                        </div>
                        {birthErrorMsg && <div style={{ color: 'red', fontSize: '10px', marginTop: '5px', marginLeft: '10px' }}>{birthErrorMsg}</div>}
                    </div>
                </form>
                <button id="saveMyInfoBt" onClick={handlerSaveMyInfo} disabled={!isPwd}>저장</button>
            </div>
        </div>
    )
}

export default MyInfo;