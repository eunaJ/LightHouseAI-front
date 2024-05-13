import React, { useEffect, useState } from 'react';
import TravelModal from './TravelModal';
import axios from 'axios';
import TravelModalCard from './TravelModalCard';
import "./TravelRegister.css";

const TravelRegister = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [travelTitle, setTravelTitle] = useState('');

    const [contents, setContents] = useState([{
        image: null, text: '', spot: {
            menu: '',
            price: '',
            opentime: '',
            closetime: '',
            location: '',
            title: '',
            image_url: '',
        }
    }]);

    // const handleImageChange = (index, event) => {
    //     const newContents = [...contents];
    //     newContents[index].image = event.target.files[0];
    //     setContents(newContents);
    // };

    const handleTextChange = (index, event) => {
        const newContents = [...contents];
        newContents[index].text = event.target.value;
        setContents(newContents);
    };

    const addContentField = () => {
        setContents([...contents, {
            image: null, text: '', spot: {
                menu: '',
                price: '',
                opentime: '',
                closetime: '',
                location: '',
                title: '',
                img_url: '',
            }
        }]);
        // setSpotData({
        //     menu: '',
        // price: '',
        // opentime: '',
        // closetime: '',
        // location: '',
        // title: '',});
    };

    const removeContentField = (index) => {
        const newContents = [...contents];
        newContents.splice(index, 1);
        setContents(newContents);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            contents.forEach((content, index) => {
                formData.append(`image${index}`, content.image); // 이미지 파일
                formData.append(`text${index}`, content.text); // 텍스트 내용
                formData.append(`spot${index}`, JSON.stringify(contents.spot)); // 객체 데이터
            });

            //     const response = await fetch('http://your-api-endpoint.com/post', {
            //       method: 'POST',
            //       body: formData,
            //     });

            //     if (response.ok) {
            //       const data = await response.json();
            //       // 등록된 내용에 대한 처리
            //       console.log('게시물이 성공적으로 등록되었습니다.');
            //     } else {
            //       console.error('게시물 등록에 실패했습니다.');
            //     }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const handleSpotAdd = (newSpot, spotImg, review, index) => {
        const newContents = [...contents];
        newContents[index].spot = {
            menu: newSpot.menu,
            price: newSpot.price,
            opentime: newSpot.opentime,
            closetime: newSpot.closetime,
            location: newSpot.location,
            title: newSpot.title,
            image_url: spotImg, 
            review: review
        }
        setContents(newContents);
        console.log(newContents[index].spot);
    };

    useEffect(() => {
        console.log(contents);
    }, [contents]);



    return (
        <div className='travelregi'>
            <div className='travelregi-top'>
                <h1 className='travelregi-title'>여행지 방문지 등록</h1>
                <div className='travelregi-traveltitle'>
                    <input type='text' placeholder='제목' className='travelregi-traveltitle-input' value={travelTitle} 
                        name="travelTitle"
                        id="titleTravel"
                        onChange={(e) => setTravelTitle(e.target.value)}
                        required></input>
                </div>
                <div className='travelregi-travel'>
                    {/* 인원 */}
                </div>
                {/* <TravelModal type={selectedType} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onSpotAdd={handleSpotAdd} onItemSelect={(selectedContents) => {
                    console.log('선택된 여행지:', selectedContents);
                    // 선택된 여행지에 대한 추가 작업 수행
                    setModalIsOpen(false);  // 모달 닫기
                }} /> */}
            </div>
            <div className='travelregi-main'>
                <div className='travelregi-main-inner'>
                    {/* <form onSubmit={handleSubmit}> */}
                    {contents.map((content, index) => (
                        <div key={index}>
                            <TravelModal type={selectedType} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onSpotAdd={handleSpotAdd} index={index}></TravelModal>
                            {contents[index].spot.location && index >= 0 ? (
                                <div className='spotdatacard'>
                                    {contents[index].spot.image_url && (  // 이미지 URL이 존재하는 경우에만 렌더링
                                        <img src={contents[index].spot.image_url} alt="Spot Image" />
                                    )}
                                    <p>위치: {contents[index].spot.location}</p>
                                    <p>메뉴: {contents[index].spot.menu}</p>
                                    <p>가격: {contents[index].spot.price}</p>
                                    <p>운영시간: {contents[index].spot.opentime} ~ {contents[index].spot.closetime}</p>
                                    <p>후기</p>
                                    <p>{contents[index].spot.review}</p>
                                </div>
                            ) : (
                                <div>
                                    <button onClick={() => {
                                        setSelectedType('카페');
                                        setModalIsOpen(true);
                                    }}>카페</button>
                                    <button onClick={() => {
                                        setSelectedType('음식점');
                                        setModalIsOpen(true);
                                    }}>음식점</button>
                                    <button onClick={() => {
                                        setSelectedType('쇼핑몰');
                                        setModalIsOpen(true);
                                    }}>쇼핑몰</button>
                                    <button onClick={() => {
                                        setSelectedType('관광지');
                                        setModalIsOpen(true);
                                    }}>관광지</button>
                                    <button onClick={() => {
                                        setSelectedType('기타서비스');
                                        setModalIsOpen(true);
                                    }}>기타서비스</button>
                                </div>
                            )}
                            {/* <div className='travelregi-img'>
                                <input
                                    type="file"
                                    onChange={(e) => handleImageChange(index, e)}
                                />
                            </div>
                            <div className='travelregi-textarea'>
                                <textarea
                                    className='travelregi-textarea-input'
                                    // rosws="4"
                                    // cols="50"
                                    value={content.text}
                                    onChange={(e) => handleTextChange(index, e)}
                                    placeholder="텍스트를 입력하세요"
                                />
                            </div> */}
                            <button className='travelregi-main-delbtn' type="button" onClick={() => removeContentField(index)}>삭제</button>
                        </div>
                    ))}
                    {/* </form> */}
                    <button className='travelregi-main-addbtn' type="button" onClick={addContentField}>장소 추가</button>
                </div>
            </div>
            <div className='travelregi-bottom'>
                <button className="travelregi-bottom-submit" type="submit" onClick={handleSubmit}>저장</button>
            </div>
        </div>
        // <div>
        //     <h1>여행지 등록 페이지</h1>
        //     <button onClick={() => setModalIsOpen(true)}>여행지 선택</button>

        //     <TravelModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onItemSelect={(selectedItem) => {
        //         console.log('선택된 여행지:', selectedItem);
        //         // 선택된 여행지에 대한 추가 작업 수행
        //         setModalIsOpen(false);  // 모달 닫기
        //     }} />
        // </div>
    );
}

export default TravelRegister;