import React from 'react';

const Travel = ({ id, title, writer, image_url, serving, expense, star }) => {
  return (
    <div style={{ padding: "3%" }}>
      <h2>{title}</h2>
      <h5>{writer}</h5>
      {image_url && (
        image_url.includes('.png') ?
          <img src={image_url} alt='여행지 이미지' /> :
          image_url.includes('.jpeg') ?
            <img src={image_url} alt='여행지 이미지' /> :
            image_url.includes('.jpg') &&
            <img src={image_url} alt='여행지 이미지' />
      )}
      {serving && <p>{serving}명과 함께</p>}
      {expense && <p>총 {expense}원</p>}
      {star && <p>별점 {star}</p>}
    </div>
  );
};

export default Travel;