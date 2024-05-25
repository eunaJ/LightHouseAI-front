import './MyPage.css'
import initProfileImg from '../../assets/img/init_profile_img.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../components/RefreshApi';
import lighthouseaiLogo from '../../assets/img/lighthouseai_logo.png';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState({
        id: '',
        email: '',
        nickname: '',
        role: '',
        birth: '',
        profile_img_url: initProfileImg,
    });

    const navigate = useNavigate();

    const gotoHome = () => {
        navigate('/');
    }

    const gotoMyinfo = () => {
        navigate('/myinfo');
    }

    const gotoTravel = () => {
        navigate('/');
    }

    const gotoTravelRegister = () => {
        navigate('/travelRegister');
    }

    const gotoMyBoard = () => {
        navigate('/myboard');
    }
    
    const gotoMyTravel = () => {
        navigate('/mytravel');
    }

    const procLogout = (e) => {
        e.preventDefault();
        const procLogout = async () => {
            try {
                const res = await api.post('/users/logout');
                localStorage.clear();
                navigate('/');
            } catch (e) {
                alert('로그아웃 실패');
            }
        };
        procLogout();
    };

    useEffect(() => {
        const fetchDataForMyPage = async () => {
            try {
                const res = await api.get('/users/user');
                if (res.status === 200) {
                    const data = res.data;
                    setUserInfo({
                        ...data,
                        profile_img_url: data.profile_img_url === '' || data.profile_img_url === null || data.profile_img_url === '/static/media/initialProfileImg.b31adf0c9ab904bf0899.png' ? initProfileImg : data.profile_img_url 
                    });
                }
            } catch (error) {
                console.error(error);
                alert('내 페이지를 불러오지 못했어요.');
            }
        };
        fetchDataForMyPage();
    }, []);

    return (
        <div className='mypage'>
            <div className='mypage-upper'>
                <div className='mypage-home-logo'>
                    <img src={lighthouseaiLogo} alt="로고" height={"70px"} width={"110px"} className='mypage-home-logo' onClick={gotoHome}></img>
                </div>
            </div>
            <div className='mypage-inner'>
                <div className='mypage-profileimg'>
                    {userInfo.profile_img_url && <img src={userInfo.profile_img_url} alt="preview" id='profileImgMyPage' />}
                </div>
                <div className='mypage-nickname'>
                    <p>{userInfo.nickname}</p>
                </div>
                <div className='mypage-info'>
                    <button id='myInfoBt' onClick={gotoMyinfo}>내 정보</button>
                    <button id='logoutMyPageBt' onClick={procLogout}>로그아웃</button>
                </div>
                <hr id="hrMyPage"></hr>
                <div className='mypage-btn'>
                    <button id="travelBt" onClick={gotoTravel}>여행지 조회</button>
                    <button id="travelRegisterBt" onClick={gotoTravelRegister}>여행지 등록</button>
                    <button id="myBoardBt" onClick={gotoMyBoard}>내 게시물</button>
                    <button id="myTContentBt" onClick={gotoMyTravel}>내 여행지</button>
                </div>
            </div>
        </div>
    );
}

export default MyPage;