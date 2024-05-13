import { useRef, useState } from "react";
import "./TravelModalCard.css";
import { useNavigate } from "react-router-dom";
import api from "../../components/RefreshApi";
import axios from "axios";

const TravelModalCard = ({ id, type, title, opentime, closetime, constituency_name, region_name, onSpotToModal, onClose }) => {
    const upload = useRef();
    const [spotImg, setSpotImg] = useState('');
    const handleSpotImgChange = (e) => {
        console.log(upload.current.files);
        setSpotImg(upload.current.files[0]);
    };

    const handleItemClick = (e) => {
        // const formData = new FormData();
        const spotData = {
            menu: menu,
            price: price,
            opentime: opentime,
            closetime: closetime,
            location: region_name + ' ' + constituency_name, // 텍스트 추가 필요
        }
        if (type === '카페') {
            spotData.cafe_title = title;
        } else if (type === '음식점') {
            spotData.restaurant_title = title;
        } else if(type === '쇼핑몰') {
            spotData.shoppingMall_title = title;
        } else if(type === '관광지') {
            spotData.tourList_title = title;
        } else if(type === '기타서비스') {
            spotData.otherService_title = title;
        }
        // formData.append("controllerRequestDto", new Blob([JSON.stringify(spotData)], { type: "application/json" }));
        // formData.append("multipartFile", spotImg);
        e.preventDefault();
        onSpotToModal(spotData, spotImg);
        onClose();
        // if (type === '카페') {
        //     onSpotToModal(spotData, spotImg);
        //     onClose();
        //     // api.post('http://localhost:8080/api/v1/travelVisitorCafes/create', formData, {
        //     //     headers: {
        //     //         "Content-Type": "multipart/form-data;",
        //     //     },
        //     // }).then(res => {
        //     //     if (res.status === 201) {
        //     //         onSpotToModal(spotData, spotImg);
        //     //         onClose();
        //     //     } else {
        //     //         alert('등록 실패');
        //     //     }
        //     // })
        // } else if (type === '음식점') {
        //     onSpotToModal(spotData, spotImg);
        //     onClose();
        //     // api.post('http://localhost:8080/api/v1/travelVisitorRestaurants/create', formData, {
        //     //     headers: {
        //     //         "Content-Type": "multipart/form-data;",
        //     //     },
        //     // }).then(res => {
        //     //     console.log(res);
        //     //     if (res.status === 201) {
        //     //         console.log(spotData);
        //     //         onSpotToModal(spotData, spotImg);
        //     //         onClose();
        //     //     } else {
        //     //         alert('등록 실패');
        //     //     }
        //     // })
        // }
    };

    const [menu, setMenu] = useState('');
    const [price, setPrice] = useState('');
    const [review, setReview] = useState('');

    return (
        <div className="travelmodalcard-container">
            <div className="travelmodalcard">
                <h3 className="travelmodalcard-title">{title}</h3>
                <div className="travelmodalcard-body">
                    <p>지역: {region_name} {constituency_name}</p>
                    <p>운영 시간: {opentime} ~ {closetime}</p>
                    <div className="travelmodalcard-inputmodal">
                        {type === "카페" || type === "음식점" ? (
                            <input type="text" placeholder="메뉴" value={menu} name="menu" id="menuTModal" onChange={(e) => setMenu(e.target.value)}></input>
                        ) : null}

                        <input type="text" placeholder="지불한 가격" value={price} name="price" id="priceTModal" onChange={(e) => setPrice(e.target.value)}></input>
                        <label className="travelmodalcard-spotimg-btn">
                            <input
                                className="travelmodalcard-spotimg-input"
                                type="file"
                                accept=".png, .jpeg, .jpg"
                                ref={upload}
                                onChange={handleSpotImgChange}
                            />
                        </label>
                        <div className='travelmodalcard-textarea'>
                            <textarea
                                className='travelmodalcard-textarea-input'
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="후기를 입력해주세요"
                            />
                        </div>
                    </div>
                </div>
                <div className="travelmodalcard-bottom">
                    <button className="travelmodalcard-bottom-addbtn" onClick={handleItemClick}>추가</button>
                </div>
            </div>
        </div>
    );
};

export default TravelModalCard;