import React, { useEffect, useRef, useState } from 'react';
import TravelModal from './TravelModal';
import axios from 'axios';
import "./TravelRegister.css";
import lighthouseaiLogo from '../../assets/img/lighthouseai_logo.png';
import { useNavigate } from 'react-router-dom';
import { areas } from "../../components/travel/Areas";

const TravelRegister = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [travelTitle, setTravelTitle] = useState('');
    const [travelImg, setTravelImg] = useState('');
    const [travelImgUrl, setTravelImgUrl] = useState('');
    const [travelServing, setTravelServing] = useState(0);
    const [travelExpense, setTravelExpense] = useState(0);
    const upload = useRef();
    const [constituency_Id, setConstituencyId] = useState(null); // constituency_id 상태 추가


    const navigate = useNavigate();
    const gotoHome = () => {
        navigate('/');
    }

    const [cafeContents, setCafeContents] = useState([{
        type: '',
        menu: '',
        price: '',
        opentime: '',
        closetime: '',
        location: '',
        cafe_title: '',
        image_url: '',
        spotImgUrl: '',
        content: '',
    }]);
    const [restaurantContents, setRestaurantContents] = useState([{
        type: '',
        menu: '',
        price: '',
        opentime: '',
        closetime: '',
        location: '',
        restaurant_title: '',
        image_url: '',
        spotImgUrl: '',
        content: '',
    }]);
    const [shoppingMallContents, setShoppingMallContents] = useState([{
        type: '',
        price: '',
        opentime: '',
        closetime: '',
        location: '',
        shoppingMall_title: '',
        image_url: '',
        spotImgUrl: '',
        content: '',
    }]);
    const [tourListContents, setTourListContents] = useState([{
        type: '',
        price: '',
        opentime: '',
        closetime: '',
        location: '',
        restaurant_title: '',
        image_url: '',
        spotImgUrl: '',
        content: '',
    }]);
    const [otherServiceContents, setOtherServiceContents] = useState([{
        type: '',
        price: '',
        opentime: '',
        closetime: '',
        location: '',
        otherService_title: '',
        image_url: '',
        spotImgUrl: '',
        content: '',
    }]);

    const handleTravelImgChange = (e) => {
        if (upload.current && upload.current.files) {
            const img = upload.current.files[0];
            setTravelImg(img);
            //이미지 미리보기
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = () => {
                setTravelImgUrl(reader.result);
                console.log(reader.result);
            };
        }
    };

    const addTravelCafeField = () => {
         if (!selectedRegion || !selectedConstituency) {
            alert('지역과 시/군/구를 선택해주세요.');
            return;
        }
        setCafeContents([...cafeContents, {
            type: '',
            menu: '',
            price: '',
            opentime: '',
            closetime: '',
            location: '',
            cafe_title: '',
            image_url: '',
            spotImgUrl: '',
            content: '',
        }]);
        setSelectedType('카페');
        setModalIsOpen(true);
    };
    const addTravelRestaurantField = () => {
         if (!selectedRegion || !selectedConstituency) {
            alert('지역과 시/군/구를 선택해주세요.');
            return;
        }
        setRestaurantContents([...restaurantContents, {
            type: '',
            menu: '',
            price: '',
            opentime: '',
            closetime: '',
            location: '',
            restaurant_title: '',
            image_url: '',
            spotImgUrl: '',
            content: '',
        }]);
        setSelectedType('음식점');
        setModalIsOpen(true);
    };
    const addTravelShoppingMallField = () => {
         if (!selectedRegion || !selectedConstituency) {
            alert('지역과 시/군/구를 선택해주세요.');
            return;
        }
        setShoppingMallContents([...shoppingMallContents, {
            type: '',
            price: '',
            opentime: '',
            closetime: '',
            location: '',
            shoppingMall_title: '',
            image_url: '',
            spotImgUrl: '',
            content: '',
        }]);
        setSelectedType('쇼핑몰');
        setModalIsOpen(true);
    };
    const addTravelTourListField = () => {
         if (!selectedRegion || !selectedConstituency) {
            alert('지역과 시/군/구를 선택해주세요.');
            return;
        }
        setTourListContents([...tourListContents, {
            type: '',
            price: '',
            opentime: '',
            closetime: '',
            location: '',
            tourList_title: '',
            image_url: '',
            spotImgUrl: '',
            content: '',
        }]);
        setSelectedType('관광지');
        setModalIsOpen(true);
    };
    const addTravelOtherServiceField = () => {
         if (!selectedRegion || !selectedConstituency) {
            alert('지역과 시/군/구를 선택해주세요.');
            return;
        }
        setOtherServiceContents([...otherServiceContents, {
            type: '',
            price: '',
            opentime: '',
            closetime: '',
            location: '',
            otherService_title: '',
            image_url: '',
            spotImgUrl: '',
            content: '',
        }]);
        setSelectedType('기타서비스');
        setModalIsOpen(true);
    };

    const removeCafeContentField = (index) => {
        const newContents = [...cafeContents];
        newContents.splice(index, 1);
        setCafeContents(newContents);
    };
    const removeRestaurantContentField = (index) => {
        const newContents = [...restaurantContents];
        newContents.splice(index, 1);
        setRestaurantContents(newContents);
    };
    const removeShoppingMallContentField = (index) => {
        const newContents = [...shoppingMallContents];
        newContents.splice(index, 1);
        setShoppingMallContents(newContents);
    };
    const removeTourListContentField = (index) => {
        const newContents = [...tourListContents];
        newContents.splice(index, 1);
        setTourListContents(newContents);
    };
    const removeOtherServiceContentField = (index) => {
        const newContents = [...otherServiceContents];
        newContents.splice(index, 1);
        setOtherServiceContents(newContents);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const travelData = {
                "title": travelTitle,
                "serving": travelServing,
                "constituency": selectedConstituency,
                "star": starCount
            };
            const formData = new FormData();
            formData.append("travelCreateRequestDto", new Blob([JSON.stringify(travelData)], { type: 'application/json' }));
            if (travelImg) {
                formData.append("travelCreateImage", travelImg);
            } else {
                formData.append('travelCreateImage', new Blob(), '');
            }

            let travelCafeList = [];
            let travelRestaurantList = [];
            let travelShoppingMallList = [];
            let travelTourListList = [];
            let travelOtherServiceList = [];
            cafeContents.forEach((content, i) => {
                if (i !== 0) {
                    travelCafeList.push(content);
                    if (content.image_url) {
                        formData.append('travelVisitorCafeImage', content.image_url);
                    } else {
                        formData.append('travelVisitorCafeImage', new Blob(), '');
                    }
                }
            })
            restaurantContents.forEach((content, i) => {
                if (i !== 0) {
                    travelRestaurantList.push(content);
                    if (content.image_url) {
                        formData.append('TravelVisitorRestaurantImage', content.image_url);
                    } else {
                        formData.append('TravelVisitorRestaurantImage', new Blob(), '');
                    }
                }
            })
            shoppingMallContents.forEach((content, i) => {
                if (i !== 0) {
                    travelShoppingMallList.push(content);
                    if (content.image_url) {
                        formData.append('TravelVisitorShoppingMallImage', content.image_url);
                    } else {
                        formData.append('TravelVisitorShoppingMallImage', new Blob(), '');
                    }
                }
            })
            tourListContents.forEach((content, i) => {
                if (i !== 0) {
                    travelTourListList.push(content);
                    if (content.image_url) {
                        formData.append('TravelVisitorTourListImage', content.image_url);
                    } else {
                        formData.append('TravelVisitorTourListImage', new Blob(), '');
                    }
                }
            })
            otherServiceContents.forEach((content, i) => {
                if (i !== 0) {
                    travelOtherServiceList.push(content);
                    if (content.image_url) {
                        formData.append('TravelVisitorOtherServiceImage', content.image_url);
                    } else {
                        formData.append('TravelVisitorOtherServiceImage', new Blob(), '');
                    }
                }
            })

            if (formData.get('travelVisitorCafeImage') === null) {
                formData.append('travelVisitorCafeImage', new Blob(), '');
            }
            if (formData.get('TravelVisitorRestaurantImage') === null) {
                formData.append('TravelVisitorRestaurantImage', new Blob(), '');
            } 
            if (formData.get('TravelVisitorShoppingMallImage') === null) {
                formData.append('TravelVisitorShoppingMallImage', new Blob(), '');
            } 
            if (formData.get('TravelVisitorTourListImage') === null) {
                formData.append('TravelVisitorTourListImage', new Blob(), '');
            } 
            if (formData.get('TravelVisitorOtherServiceImage') === null) {
                formData.append('TravelVisitorOtherServiceImage', new Blob(), '');
            }

            formData.append("TravelVisitorCafeCreateServiceRequestDto", new Blob([JSON.stringify(travelCafeList)], { type: 'application/json' }));
            formData.append("TravelVisitorRestaurantCreateServiceRequestDto", new Blob([JSON.stringify(travelRestaurantList)], { type: 'application/json' }));
            formData.append("TravelVisitorShoppingMallCreateServiceRequestDto", new Blob([JSON.stringify(travelShoppingMallList)], { type: 'application/json' }));
            formData.append("TravelVisitorTourListCreateServiceRequestDto", new Blob([JSON.stringify(travelTourListList)], { type: 'application/json' }));
            formData.append("TravelVisitorOtherServiceCreateServiceRequestDto", new Blob([JSON.stringify(travelOtherServiceList)], { type: 'application/json' }));

            const res = await axios.post('http://localhost:8080/api/v1/travels/create', formData, {
                headers: {
                    'Authorization': localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data'
                },
            })
            if (res.status === 201) {
                alert('등록되었습니다.');
                navigate('/');
            }
        } catch (e) {
            console.error('오류 발생:', e);
            alert(e.response.data.message);
        }
    };

    const handleCafeSpotAdd = (newSpot, spotImg, spotImgUrl, content, index) => {
        const newContents = [...cafeContents];
        newContents[index] = {
            type: newSpot.type,
            menu: newSpot.menu,
            price: newSpot.price,
            opentime: newSpot.opentime,
            closetime: newSpot.closetime,
            location: newSpot.location,
            cafe_title: newSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            content: content
        }
        setCafeContents(newContents);
    };
    const handleRestaurantSpotAdd = (newSpot, spotImg, spotImgUrl, content, index) => {
        const newContents = [...restaurantContents];
        newContents[index] = {
            type: newSpot.type,
            menu: newSpot.menu,
            price: newSpot.price,
            opentime: newSpot.opentime,
            closetime: newSpot.closetime,
            location: newSpot.location,
            restaurant_title: newSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            content: content
        }
        setRestaurantContents(newContents);
    };
    const handleShoppingMallSpotAdd = (newSpot, spotImg, spotImgUrl, content, index) => {
        const newContents = [...shoppingMallContents];
        newContents[index] = {
            type: newSpot.type,
            price: newSpot.price,
            opentime: newSpot.opentime,
            closetime: newSpot.closetime,
            location: newSpot.location,
            shoppingMall_title: newSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            content: content
        }
        setShoppingMallContents(newContents);
    };
    const handleTourListSpotAdd = (newSpot, spotImg, spotImgUrl, content, index) => {
        const newContents = [...tourListContents];
        newContents[index] = {
            type: newSpot.type,
            price: newSpot.price,
            opentime: newSpot.opentime,
            closetime: newSpot.closetime,
            location: newSpot.location,
            tourList_title: newSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            content: content
        }
        setTourListContents(newContents);
    };
    const handleOtherServiceSpotAdd = (newSpot, spotImg, spotImgUrl, content, index) => {
        const newContents = [...otherServiceContents];
        newContents[index] = {
            type: newSpot.type,
            price: newSpot.price,
            opentime: newSpot.opentime,
            closetime: newSpot.closetime,
            location: newSpot.location,
            otherService_title: newSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            content: content
        }
        setOtherServiceContents(newContents);
    };

    useEffect(() => {
    }, [cafeContents, restaurantContents, shoppingMallContents, tourListContents, otherServiceContents]);

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('');
    const subAreas = areas.find((area) => area.name === selectedRegion)?.subArea || [];

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedConstituency('');
    };
    
    const handleConstituencyChange = (e) => {
        setSelectedConstituency(e.target.value);
        setConstituencyId(findSubAreaIndex(selectedRegion, e.target.value)); // Update constituency_id

    };
    const findSubAreaIndex = (region, constituency) => {
    const area = areas.find(area => area.name === region);
        if (!area) return 0;
        return area.subArea.findIndex(subArea => subArea === constituency);
    };
    var constituency_id = parseInt(findSubAreaIndex(selectedRegion, selectedConstituency)) + 1;
    const [starCount, setStarcount] = useState(0);
    const starColor = starCount * 20 + "%";

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
                    <div className='travelregi-img-pcontent'>
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
                                max="5"
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
                    <hr></hr>
                    {cafeContents.map((content, index) => (
                        <div key={index}>
                            <TravelModal type={selectedType} isOpen={modalIsOpen} constituency_id={constituency_id} onClose={() => setModalIsOpen(false)} onCafeSpotAdd={handleCafeSpotAdd} index={index}></TravelModal>
                            {cafeContents[index].location && index >= -1 &&
                                <div className='spotdatacard'>
                                    <h3>{cafeContents[index].cafe_title}</h3>
                                    {cafeContents[index].image_url && (
                                        <img src={cafeContents[index].spotImgUrl} alt="Spot Image" className='spotdatacard-img' />
                                    )}
                                    <p>위치: {cafeContents[index].location}</p>
                                    <p>메뉴: {cafeContents[index].menu}</p>
                                    <p>가격: {cafeContents[index].price}</p>
                                    <p>운영시간: {cafeContents[index].opentime} ~ {cafeContents[index].closetime}</p>
                                    <p>{cafeContents[index].content}</p>
                                </div>}
                            {index > 0 && <button className='travelregi-main-delbtn' type="button" onClick={() => removeCafeContentField(index)}>삭제</button>}
                        </div>
                    ))}
                    <button className='travelregi-main-addbtn' type="button" onClick={addTravelCafeField}>카페 추가</button>
                    <hr></hr>
                    {restaurantContents.map((content, index) => (
                        <div key={index}>
                            <TravelModal type={selectedType} isOpen={modalIsOpen} constituency_id={constituency_id} onClose={() => setModalIsOpen(false)} onRestaurantSpotAdd={handleRestaurantSpotAdd} index={index}></TravelModal>
                            {restaurantContents[index].location && index >= -1 &&
                                <div className='spotdatacard'>
                                    <h3>{restaurantContents[index].restaurant_title}</h3>
                                    {restaurantContents[index].image_url && (
                                        <img src={restaurantContents[index].spotImgUrl} alt="Spot Image" className='spotdatacard-img' />
                                    )}
                                    <p>위치: {restaurantContents[index].location}</p>
                                    <p>메뉴: {restaurantContents[index].menu}</p>
                                    <p>가격: {restaurantContents[index].price}</p>
                                    <p>운영시간: {restaurantContents[index].opentime} ~ {restaurantContents[index].closetime}</p>
                                    <p>{restaurantContents[index].content}</p>
                                </div>
                            }
                            {index > 0 && <button className='travelregi-main-delbtn' type="button" onClick={() => removeRestaurantContentField(index)}>삭제</button>}
                        </div>
                    ))}
                    <button className='travelregi-main-addbtn' type="button" onClick={addTravelRestaurantField}>음식점 추가</button>
                    <hr></hr>
                    {shoppingMallContents.map((content, index) => (
                        <div key={index}>
                            <TravelModal type={selectedType} isOpen={modalIsOpen} constituency_id={constituency_id} onClose={() => setModalIsOpen(false)} onShoppingMallSpotAdd={handleShoppingMallSpotAdd} index={index}></TravelModal>
                            {shoppingMallContents[index].location && index >= -1 &&
                                <div className='spotdatacard'>
                                    <h3>{shoppingMallContents[index].shoppingMall_title}</h3>
                                    {shoppingMallContents[index].image_url && (
                                        <img src={shoppingMallContents[index].spotImgUrl} alt="Spot Image" className='spotdatacard-img' />
                                    )}
                                    <p>위치: {shoppingMallContents[index].location}</p>
                                    <p>가격: {shoppingMallContents[index].price}</p>
                                    <p>운영시간: {shoppingMallContents[index].opentime} ~ {shoppingMallContents[index].closetime}</p>
                                    <p>{shoppingMallContents[index].content}</p>
                                </div>
                            }
                            {index > 0 && <button className='travelregi-main-delbtn' type="button" onClick={() => removeShoppingMallContentField(index)}>삭제</button>}
                        </div>
                    ))}
                    <button className='travelregi-main-addbtn' type="button" onClick={addTravelShoppingMallField}>쇼핑몰 추가</button>
                    <hr></hr>
                    {tourListContents.map((content, index) => (
                        <div key={index}>
                            <TravelModal type={selectedType} isOpen={modalIsOpen} constituency_id={constituency_id} onClose={() => setModalIsOpen(false)} onTourListSpotAdd={handleTourListSpotAdd} index={index}></TravelModal>
                            {tourListContents[index].location && index >= -1 &&
                                <div className='spotdatacard'>
                                    <h3>{tourListContents[index].tourList_title}</h3>
                                    {tourListContents[index].image_url && (
                                        <img src={tourListContents[index].spotImgUrl} alt="Spot Image" className='spotdatacard-img' />
                                    )}
                                    <p>위치: {tourListContents[index].location}</p>
                                    <p>가격: {tourListContents[index].price}</p>
                                    <p>운영시간: {tourListContents[index].opentime} ~ {tourListContents[index].closetime}</p>
                                    <p>{tourListContents[index].content}</p>
                                </div>}
                            {index > 0 && <button className='travelregi-main-delbtn' type="button" onClick={() => removeTourListContentField(index)}>삭제</button>}
                        </div>
                    ))}
                    <button className='travelregi-main-addbtn' type="button" onClick={addTravelTourListField}>관광지 추가</button>
                    <hr></hr>
                    {otherServiceContents.map((content, index) => (
                        <div key={index}>
                            <TravelModal type={selectedType} isOpen={modalIsOpen} constituency_id={constituency_id} onClose={() => setModalIsOpen(false)} onOtherServiceSpotAdd={handleOtherServiceSpotAdd} index={index}></TravelModal>
                            {otherServiceContents[index].location && index >= -1 &&
                                <div className='spotdatacard'>
                                    <h3>{otherServiceContents[index].otherService_title}</h3>
                                    {otherServiceContents[index].image_url && (
                                        <img src={otherServiceContents[index].spotImgUrl} alt="Spot Image" className='spotdatacard-img' />
                                    )}
                                    <p>위치: {otherServiceContents[index].location}</p>
                                    <p>가격: {otherServiceContents[index].price}</p>
                                    <p>운영시간: {otherServiceContents[index].opentime} ~ {otherServiceContents[index].closetime}</p>
                                    <p>{otherServiceContents[index].content}</p>
                                </div>
                            }
                            {index > 0 && <button className='travelregi-main-delbtn' type="button" onClick={() => removeOtherServiceContentField(index)}>삭제</button>}
                        </div>
                    ))}
                    <button className='travelregi-main-addbtn' type="button" onClick={addTravelOtherServiceField}>기타서비스 추가</button>
                </div>
            </div>
            <div className='travelregi-bottom'>
                <button className="travelregi-bottom-submit" type="submit" onClick={handleSubmit}>저장</button>
            </div>
        </div>
    );
}

export default TravelRegister;