import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ reviewId, onCommentAdded }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/v1/reviews/${reviewId}/comments`, { content })
      .then(response => {
        setContent('');
        onCommentAdded(response.data);
      })
      .catch(error => {
        console.error("댓글 작성 실패:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 작성하세요"
      />
      <button type="submit">댓글 작성</button>
    </form>
  );
};

export default CommentForm;
