import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function KakaoRedirect() {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        const kakaoLogin = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/users/kakao/login/callback?code=${code}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                let access = res.headers['access-token'];
                localStorage.setItem('accessToken', access);
                navigate('/');
            } catch (error) {
                console.error('카카오 로그인 에러:', error);
                alert('카카오 로그인에 실패했어요.');
            }
        }
        kakaoLogin();
    }, []);

    return (
        <div>
            <h1>카카오 로그인 중입니다.</h1>
        </div>
    );
}