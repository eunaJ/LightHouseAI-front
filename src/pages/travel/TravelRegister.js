import React, { useEffect, useRef, useState } from 'react';
import TravelModal from './TravelModal';
import axios from 'axios';
import "./TravelRegister.css";
import lighthouseaiLogo from '../../assets/img/lighthouseai_logo.png';
import { useNavigate } from 'react-router-dom';

const TravelRegister = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [travelTitle, setTravelTitle] = useState('');
    const [travelImg, setTravelImg] = useState('');
    const [travelImgUrl, setTravelImgUrl] = useState('');
    const [travelServing, setTravelServing] = useState(0);
    const [travelExpense, setTravelExpense] = useState(0);
    const upload = useRef();

    const navigate = useNavigate();
    const gotoHome = () => {
        navigate('/');
    }

    const [contents, setContents] = useState([{
        image: null, text: '', spot: {
            type: '',
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

    const handleTravelImgChange = (e) => {
        if (upload.current && upload.current.files) {
            const img = upload.current.files[0];
            setTravelImg(img);
            //이미지 미리보기
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = () => {
                setTravelImgUrl(reader.result);
            };
            console.log(img);
        }
    };

    const addContentField = () => {
        setContents([...contents, {
            image: null, text: '', spot: {
                type: '',
                menu: '',
                price: '',
                opentime: '',
                closetime: '',
                location: '',
                title: '',
                image_url: '',
                review: '',
            }
        }]);
    };

    const removeContentField = (index) => {
        const newContents = [...contents];
        newContents.splice(index, 1);
        setContents(newContents);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const travelData = {
                "title": travelTitle,
                // "serving": travelServing,
                // "travel_expense": travelExpense,
                "constituency": selectedConstituency,
                // "star": starCount
            };
            const formData = new FormData();
            formData.append("travelCreateRequestDto", new Blob([JSON.stringify(travelData)], { type: 'application/json' }));
            console.log(travelImg);
            if (travelImg) {
                formData.append("travelCreateImage", travelImg);
            } else {
                formData.append('travelCreateImage', new Blob(), '');
            }
            // contents.forEach((item, index) => {
            //     formData.append(`TravelVisitorCafeCreateControllerRequestDto[${index}]`, JSON.stringify(item));
            //   });
            //   contents.forEach((item, index) => {
            //     formData.append(`travelVisitorCafeImage[${index}]`, item);
            //   });

            const travelCafeList = contents.map(obj => {
                console.log(obj.spot.type);
                // console.log
                if (obj.spot.type === "카페") {
                    return { cafe_title: obj.spot.title, menu: obj.spot.menu, price: obj.spot.price, opentime: obj.spot.opentime, closetime: obj.spot.closetime, location: obj.spot.location };
                }
                // } else if(obj.spot.type === "음식점"){
                //     return { restaurant_title: obj.spot.title, menu: obj.spot.menu, price: obj.spot.price, opentime: obj.spot.opentime, closetime: obj.spot.closetime, location: obj.spot.location };
                // } else if(obj.spot.type === "쇼핑몰"){
                //     return { shoppingMall_title: obj.spot.title, price: obj.spot.price, opentime: obj.spot.opentime, closetime: obj.spot.closetime, location: obj.spot.location };
                // } else if(obj.spot.type === "관광지"){
                //     return { tourList_title: obj.spot.title, price: obj.spot.price, opentime: obj.spot.opentime, closetime: obj.spot.closetime, location: obj.spot.location };
                // } else if(obj.spot.type === "기타서비스"){
                //     return { otherService_title: obj.spot.title, price: obj.spot.price, opentime: obj.spot.opentime, closetime: obj.spot.closetime, location: obj.spot.location };
                // }
            });

            const travelRestaurantList = contents.map(obj => {
                console.log(obj.spot.type);
                if (obj.spot.type === "음식점") {
                    return { restaurant_title: obj.spot.title, menu: obj.spot.menu, price: obj.spot.price, opentime: obj.spot.opentime, closetime: obj.spot.closetime, location: obj.spot.location };
                    // } else if(obj.spot.type === "쇼핑몰"){
                    //     return { shoppingMall_title: obj.spot.title, price: obj.spot.price, opentime: obj.spot.opentime, closetime: obj.spot.closetime, location: obj.spot.location };
                    // } else if(obj.spot.type === "관광지"){
                    //     return { tourList_title: obj.spot.title, price: obj.spot.price, opentime: obj.spot.opentime, closetime: obj.spot.closetime, location: obj.spot.location };
                    // } else if(obj.spot.type === "기타서비스"){
                    //     return { otherService_title: obj.spot.title, price: obj.spot.price, opentime: obj.spot.opentime, closetime: obj.spot.closetime, location: obj.spot.location };
                }
            });

            let imgList = [];
            contents.forEach((content, index) => {
                console.log(content.spot.image_url);
                if (content.spot.image_url) {
                    if (content.spot.type === "카페") {
                        imgList = [...imgList, content.spot.image_url];
                        // formData.append('travelVisitorCafeImage', content.spot.image_url);
                        console.log(formData.get('travelVisitorCafeImage'));
                    }
                    // else if (content.spot.type === "음식점") {
                    //     formData.append('travelVisitorRestaurantImage', content.spot.image_url);
                    //     console.log(formData.get('travelVisitorRestaurantImage'));
                    // }
                } else {
                    if (content.spot.type === "카페") {
                        formData.append('travelVisitorCafeImage', new Blob(), '');
                        console.log(formData.get('travelVisitorCafeImage'));
                    }
                    // } else if (content.spot.type === "음식점") {
                    //     formData.append('travelVisitorRestaurantImage', new Blob(), '');
                    //     console.log(formData.get('travelVisitorRestaurantImage'));
                    // }
                }
            });

            formData.append("travelVisitorCafeImage", new Blob([imgList], { type: 'image/png;image/jpeg' }));

            console.log(travelCafeList);
            console.log(travelRestaurantList);

            for (let i = 0; i < contents.length; i++) {
                let spotData = {
                    "menu": contents[i].spot.menu,
                    "price": contents[i].spot.price,
                    "opentime": contents[i].spot.opentime,
                    "closetime": contents[i].spot.closetime,
                    "location": contents[i].spot.location,
                    // "review": contents[i].spot.review,
                }
                if (contents[i].spot.type === "카페") {
                    spotData.cafe_title = contents[i].spot.title;
                } else if (contents[i].spot.type === "음식점") {
                    spotData.restaurant_title = contents[i].spot.title;
                } else if (contents[i].spot.type === "쇼핑몰") {
                    spotData.shoppingMall_title = contents[i].spot.title;
                } else if (contents[i].spot.type === "관광지") {
                    spotData.tourList_title = contents[i].spot.title;
                } else if (contents[i].spot.type === "기타서비스") {
                    spotData.otherService_title = contents[i].spot.title;
                }
                // formData.append("TravelVisitorCafeCreateServiceRequestDto[" + i + "]", new Blob([JSON.stringify(spotData)], { type: 'application/json' }));
                // spotList.append(JSON.stringify(spotData));
                // if(contents[i].spot.image_url) {
                //     formData.append("travelVisitorCafeImage"+i, contents[i].spot.image_url);
                // }
            }
            // formData.append("TravelVisitorCafeCreateServiceRequestDto", new Blob([JSON.stringify(selectedJsonStringList)], { type: 'application/json' }));
            // formData.append('TravelVisitorCafeCreateServiceRequestDto', JSON.stringify(selectedJsonStringList));
            // const jsonDataBlob = new Blob([JSON.stringify(travelCafeList)], { type: 'application/json' });
            // formData.append("TravelVisitorCafeCreateServiceRequestDto", jsonDataBlob);
            const travelCafeData = new Blob([JSON.stringify(travelCafeList)], { type: 'application/json' });
            formData.append("TravelVisitorCafeCreateServiceRequestDto", travelCafeData);
            // const travelRestaurantData = new Blob([JSON.stringify(travelCafeList)], { type: 'application/json' });
            // formData.append("TravelVisitorRestaurantCreateServiceRequestDto", travelRestaurantData);

            // formData.append("travelVisitorCafeImages", imgList);

            // formData.append("")

            // contents.forEach((content, index) => {
            //     formData.append('createRequestDto', JSON.stringify(contents[index].spot));
            //     formData.append('multipartFile', contents[index].spot.image_url);
            //     // formData.append(`multipartFile${index}`, contents[index].spot.image_url);
            // });

            // 콘솔 확인용
            // console.log(...formData);
            var formDataJSON = {};
            formData.forEach(function (value, key) {
                formDataJSON[key] = value;
            });
            console.log(formDataJSON);
            console.log(...formData);


            // 성공
            const res = await axios.post('http://localhost:8080/api/v1/travels/create', formData, {
                headers: {
                    'Authorization': localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data'
                },
            })
            if (res.status === 201) {
                alert('등록되었습니다.');
            }
        } catch (e) {
            console.error('오류 발생:', e);
            alert(e.response.data.message);
        }
    };

    const handleSpotAdd = (newSpot, spotImg, spotImgUrl, review, index) => {
        const newContents = [...contents];
        newContents[index].spot = {
            type: newSpot.type,
            menu: newSpot.menu,
            price: newSpot.price,
            opentime: newSpot.opentime,
            closetime: newSpot.closetime,
            location: newSpot.location,
            title: newSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            review: review
        }
        setContents(newContents);
        console.log(newContents[index].spot);
    };

    useEffect(() => {
        console.log(contents);
    }, [contents]);

    const areas = [
        {
            name: "서울",
            subArea: [
                "강남구",
                "강동구",
                "강북구",
                "강서구",
                "관악구",
                "광진구",
                "구로구",
                "금천구",
                "노원구",
                "도봉구",
                "동대문구",
                "동작구",
                "마포구",
                "서대문구",
                "서초구",
                "성동구",
                "성북구",
                "송파구",
                "양천구",
                "영등포구",
                "용산구",
                "은평구",
                "종로구",
                "중구",
                "중랑구",
            ],
        },
        {
            name: "경기",
            subArea: [
                "고양시",
                "과천시",
                "광명시",
                "광주시",
                "구리시",
                "군포시",
                "김포시",
                "남양주시",
                "동두천시",
                "부천시",
                "성남시",
                "수원시",
                "시흥시",
                "안산시",
                "안성시",
                "안양시",
                "양주시",
                "오산시",
                "용인시",
                "의왕시",
                "의정부시",
                "이천시",
                "파주시",
                "평택시",
                "포천시",
                "하남시",
                "화성시",
                "가평군",
                "양평군",
                "여주군",
                "연천군",
            ],
        },
        {
            name: "인천",
            subArea: [
                "계양구",
                "미추홀구",
                "남동구",
                "동구",
                "부평구",
                "서구",
                "연수구",
                "중구",
                "강화군",
                "옹진군",
            ],
        },
        {
            name: "대전광역시",
            subArea: ["대덕구", "동구", "서구", "유성구", "중구"],
        },
        {
            name: "대구광역시",
            subArea: ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
        },
        {
            name: "부산광역시",
            subArea: [
                "강서구",
                "금정구",
                "남구",
                "동구",
                "동래구",
                "부산진구",
                "북구",
                "사상구",
                "사하구",
                "서구",
                "수영구",
                "연제구",
                "영도구",
                "중구",
                "해운대구",
                "기장군",
            ],
        },
        {
            name: "울산광역시",
            subArea: ["남구", "동구", "북구", "중구", "울주군"],
        },
        {
            name: "광주광역시",
            subArea: ["광산구", "남구", "동구", "북구", "서구"],
        },
        {
            name: "강원도",
            subArea: [
                "강릉시",
                "동해시",
                "삼척시",
                "속초시",
                "원주시",
                "춘천시",
                "태백시",
                "고성군",
                "양구군",
                "양양군",
                "영월군",
                "인제군",
                "정선군",
                "철원군",
                "평창군",
                "홍천군",
                "화천군",
                "횡성군",
            ],
        },
        {
            name: "충청북도",
            subArea: [
                "제천시",
                "청주시",
                "충주시",
                "괴산군",
                "단양군",
                "보은군",
                "영동군",
                "옥천군",
                "음성군",
                "증평군",
                "진천군",
                "청원군",
            ],
        },

        {
            name: "충청남도",
            subArea: [
                "계룡시",
                "공주시",
                "논산시",
                "보령시",
                "서산시",
                "아산시",
                "천안시",
                "금산군",
                "당진군",
                "부여군",
                "서천군",
                "연기군",
                "예산군",
                "청양군",
                "태안군",
                "홍성군",
            ],
        },

        {
            name: "경상북도",
            subArea: [
                "경산시",
                "경주시",
                "구미시",
                "김천시",
                "문경시",
                "상주시",
                "안동시",
                "영주시",
                "영천시",
                "포항시",
                "고령군",
                "군위군",
                "봉화군",
                "성주군",
                "영덕군",
                "영양군",
                "예천군",
                "울릉군",
                "울진군",
                "의성군",
                "청도군",
                "청송군",
                "칠곡군",
            ],
        },
        {
            name: "경상남도",
            subArea: [
                "거제시",
                "김해시",
                "마산시",
                "밀양시",
                "사천시",
                "양산시",
                "진주시",
                "진해시",
                "창원시",
                "통영시",
                "거창군",
                "고성군",
                "남해군",
                "산청군",
                "의령군",
                "창녕군",
                "하동군",
                "함안군",
                "함양군",
                "합천군",
            ],
        },
        {
            name: "전라북도",
            subArea: [
                "군산시",
                "김제시",
                "남원시",
                "익산시",
                "전주시",
                "정읍시",
                "고창군",
                "무주군",
                "부안군",
                "순창군",
                "완주군",
                "임실군",
                "장수군",
                "진안군",
            ],
        },
        {
            name: "전라남도",
            subArea: [
                "광양시",
                "나주시",
                "목포시",
                "순천시",
                "여수시",
                "강진군",
                "고흥군",
                "곡성군",
                "구례군",
                "담양군",
                "무안군",
                "보성군",
                "신안군",
                "영광군",
                "영암군",
                "완도군",
                "장성군",
                "장흥군",
                "진도군",
                "함평군",
                "해남군",
                "화순군",
            ],
        },
        {
            name: "제주도",
            subArea: ["서귀포시", "제주시"],
        },
        {
            name: "경상남도",
            subArea: [
                "거제시",
                "김해시",
                "마산시",
                "밀양시",
                "사천시",
                "양산시",
                "진주시",
                "진해시",
                "창원시",
                "통영시",
                "거창군",
                "고성군",
                "남해군",
                "산청군",
                "의령군",
                "창녕군",
                "하동군",
                "함안군",
                "함양군",
                "합천군",
            ],
        },
    ];

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('');
    const subAreas = areas.find((area) => area.name === selectedRegion)?.subArea || [];

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedConstituency('');
    };

    const handleConstituencyChange = (e) => {
        setSelectedConstituency(e.target.value);
    };

    const [starCount, setStarcount] = useState(0);
    const starColor = starCount * 10 + "%";
    console.log(starCount);

    return (
        <div className='travelregi'>
            <div className='travelregi-top'>
                <div className='travelregi-logo'>
                    <img src={lighthouseaiLogo} alt="로고" height={"100px"} id='lighthouseaiLogo' onClick={gotoHome}></img>
                </div>
                <h2 className='travelregi-title'>여행지 방문지 등록</h2>
                <div className='travelregi-traveltitle'>
                    <input type='text' placeholder='제목' className='travelregi-traveltitle-input' value={travelTitle}
                        name="travelTitle"
                        id="titleTravel"
                        onChange={(e) => setTravelTitle(e.target.value)}
                        required></input>
                </div>
            </div>
            <div className='travelregi-inner'>
                <div className='travelregi-main'>
                    <div className='travelregi-img-preview'>
                        {travelImgUrl && (
                            <img src={travelImgUrl} alt="여행지 사진" width={'30%'} />
                        )}
                    </div>
                    <div className='travelregi-img'>
                        <label className="travelregi-img-btn">
                            <input
                                className="travelregi-img-input"
                                type="file"
                                accept=".png, .jpeg, .jpg"
                                ref={upload}
                                onChange={handleTravelImgChange}
                            />
                        </label>
                    </div>
                    <div className='travelregi-region-select'>
                        <select value={selectedRegion} onChange={handleRegionChange}>
                            <option value="">지역을 선택해주세요</option>
                            {areas.map((region) => (
                                <option key={region.name} value={region.name}>{region.name}</option>
                            ))}
                        </select>
                        <select value={selectedConstituency} onChange={handleConstituencyChange}>
                            <option value="">시,군,구를 선택해주세요</option>
                            {subAreas.map((constituency) => (
                                <option key={constituency} value={constituency}>{constituency}</option>
                            ))}
                        </select>
                    </div>
                    <div className='travelregi-serving'>
                        <label>인원<input className="travelregi-serving-input" type="number" name="serving" placeholder="인원" onChange={(e) => setTravelServing(e.target.value)}></input></label>
                    </div>
                    <div className='travelregi-expense'>
                        <label>경비 <input type="number"
                            className="travelregi-expense-input" name="expense" placeholder="경비" onChange={(e) => setTravelExpense(e.target.value)}></input></label>
                    </div>
                    <div className='travelregi-star-container'>
                        <span className="travelregi-star">
                            ★★★★★
                            <span className='travelregi-star-span'>★★★★★</span>
                            <input
                                className='travelregi-star-input'
                                type="range"
                                onMouseUp={(e) => setStarcount(e.target.value)}
                                onTouchEnd={(e) => setStarcount(e.target.value)}
                                step="1"
                                min="0"
                                max="10"
                            />
                        </span>
                        <style jsx>{`
                        .travelregi-star span {
                            left: 0;
                            width: ${starColor};
                            position: absolute;
                            color: #ffd700;
                            overflow: hidden;
                            pointer-events: none;
                        }
                        `}</style>
                    </div>
                    {contents.map((content, index) => (
                        <div key={index}>
                            <TravelModal type={selectedType} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onSpotAdd={handleSpotAdd} index={index}></TravelModal>
                            {contents[index].spot.location && index >= 0 ? (
                                <div className='spotdatacard'>
                                    <h3>{contents[index].spot.title}</h3>
                                    {contents[index].spot.image_url && (
                                        <img src={contents[index].spot.spotImgUrl} alt="Spot Image" />
                                    )}
                                    <p>위치: {contents[index].spot.location}</p>
                                    <p>메뉴: {contents[index].spot.menu}</p>
                                    <p>가격: {contents[index].spot.price}</p>
                                    <p>운영시간: {contents[index].spot.opentime} ~ {contents[index].spot.closetime}</p>
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
                            <button className='travelregi-main-delbtn' type="button" onClick={() => removeContentField(index)}>삭제</button>
                        </div>
                    ))}
                    <button className='travelregi-main-addbtn' type="button" onClick={addContentField}>장소 추가</button>
                </div>
            </div>
            <div className='travelregi-bottom'>
                <button className="travelregi-bottom-submit" type="submit" onClick={handleSubmit}>저장</button>
            </div>
        </div>
    );
}

export default TravelRegister;