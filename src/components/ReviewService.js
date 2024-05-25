// 리뷰 생성
export const createReview = async (boardId, reviewData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/boards/${boardId}/reviews/create`, reviewData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Review creation failed:', error);
        throw error;
    }
};

// 리뷰 수정
export const updateReview = async (reviewId, reviewData, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/reviews/${reviewId}`, reviewData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Review update failed:', error);
        throw error;
    }
};

// 리뷰 삭제
export const deleteReview = async (reviewId, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/reviews/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Review deletion failed:', error);
        throw error;
    }
};

// 특정 게시판의 모든 리뷰 조회
export const getReviews = async (boardId, page = 0, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/boards/${boardId}/reviews?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Fetching reviews failed:', error);
        throw error;
    }
};