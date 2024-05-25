import React from 'react';

const StarbucksItem = ({ item,index, handleClick  }) => {
  return (
    <div className="starbucks-item" onClick={() => handleClick(index)}>
      <h2 dangerouslySetInnerHTML={{ __html: item.title }} />
      <p>카테고리: {item.category}</p>
      <p>주소: {item.address}</p>
      <p>도로명 주소: {item.roadAddress}</p>
      <a href={item.link} target="_blank" rel="noopener noreferrer">웹사이트</a>
    </div>
  );
};

export default StarbucksItem;
