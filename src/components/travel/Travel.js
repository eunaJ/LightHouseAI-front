import React from 'react';

const Travel = ({ title, writer, image_url, serving, expense, star }) => {
  return (
    <div>
      <h2 style={{ marginTop: "0", marginBottom: "0", paddingLeft: "3%", height: "40px" }}>{title}</h2>
      <h5 style={{ marginTop: "0", paddingLeft: "3%", backgroundColor: "#f1f3f5" }}>{writer}</h5>
      {serving || expense ? <hr /> : null}
      {image_url && (['.png', '.jpeg', '.jpg'].some(ext => image_url.includes(ext)) && (
        <img src={image_url} style={{ marginLeft: "3%" }} alt='여행지 이미지' />
      ))}
      {/* {image_url && (
        image_url.includes('.png') ?
          <img src={image_url} alt='여행지 이미지' /> :
          image_url.includes('.jpeg') ?
            <img src={image_url} alt='여행지 이미지' /> :
            image_url.includes('.jpg') &&
            <img src={image_url} alt='여행지 이미지' />
      )} */}
      <div style={{ paddingLeft: "3%" }}>
        {serving !== 0 && <p>{serving}명과 함께</p>}
        {expense !== 0 && <p>총 {expense}원</p>}
        {star !== 0 && (
          <p style={{ margin: "0" }}>
            {[...Array(star)].map((_, index) => (
              <span key={index}>★</span>
            ))}
            {' '} {star}
          </p>
        )}
      </div>
    </div>
  );
};

export default Travel;