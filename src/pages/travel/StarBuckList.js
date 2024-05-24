import React from 'react';
import StarbucksItem from './StarbucksItem';

const StarbucksList = ({ data,handleClick }) => {
  return (
    <div className="starbucks-list">
      {data.map((item, index) => (
        <div key={index} className="starbucks-box">
          <StarbucksItem item={item} index={index} handleClick={handleClick} />
        </div>
      ))}
    </div>
  );
};

export default StarbucksList;  // 기본 내보내기
