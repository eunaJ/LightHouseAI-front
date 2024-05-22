import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // 추후 변경 필요
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `${accessToken}`;
        }
        // const refreshToken = axios.defaults.headers.common;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await getNewAccessToken();
            if (newAccessToken) {
                originalRequest.headers.Authorization = `${newAccessToken}`;
                return api(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

async function getNewAccessToken() {
    try {
        const refreshRes = await axios.post('http://localhost:8080/api/v1/users/refresh', {
        }, {
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie": ""
            }
        });
        const newAccessToken = refreshRes.headers.get('Access-Token');
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error('토큰 재발급에 실패했습니다.');
        return null;
    }
}

export default api;