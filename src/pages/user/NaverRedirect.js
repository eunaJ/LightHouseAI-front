import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function NaverRedirect() {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    // const [cookie, setCookie, removeCookie] = useCookies(["refreshToken"]);

    useEffect(() => {
        const naverLogin = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/users/naver/login/callback?code=${code}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        //'Access-Control-Allow-Origin': 'http://localhost:3000',
                    }
                });
                let access = res.headers['access-token'];
                // let refresh = res.headers['set-cookie'];
                localStorage.setItem('accessToken', access);
                navigate('/');
            } catch (error) {
                console.log('네이버 로그인 에러:', error);
                alert('네이버 로그인에 실패했어요.');
            }
        }
        naverLogin();
    }, []);

    return (
        <div>
            <h1>네이버 로그인 중입니다.</h1>
        </div>
    );
}