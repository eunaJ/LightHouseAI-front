import React from 'react';

const Travel = ({ id, title, image_url}) => {
  return (
    <div>
      <h2>{title}</h2>
      <img src={image_url} alt='여행지 이미지'></img>
      {/* <h5>{createdBy}</h5> */}
      <hr />
      {/* <p>{contents}</p> */}
    </div>
  );
};

export default Travel;