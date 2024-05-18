import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import TravelModalCard from './TravelModalCard';
import axios from 'axios';

const TravelModalCafeUpdate = ({ index, type, isCafeOpen, onCafeClose, travel, title, onCafeSpotToModal }) => {
    const modalStyles = {
        content: {
            width: '40%',
            height: '65%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // 중앙 정렬
            padding: '30px'
        }
    };

    const handleClear = (e) => {
        setMenu('');
        setPrice('');
        setContent('');
        onCafeClose();
    }
    const upload = useRef();
    const [spotImg, setSpotImg] = useState('');
    const [spotImgUrl, setSpotImgUrl] = useState('');
    const [imageChange, setImgChange] = useState(false);
    const handleSpotImgChange = (e) => {
        const img = upload.current.files[0];
        setSpotImg(img);
        setImgChange(true);
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
            setSpotImgUrl(reader.result);
        };
    };

    const handleItemClick = (e) => {
        e.preventDefault();
        const spotData = {
            id: travel.id,
            menu: menu,
            price: price,
            opentime: travel.opentime,
            closetime: travel.closetime,
            location: travel.location,
            title: title,
            type: type
        }
        // if (type === "카페") {
            onCafeSpotToModal(spotData, spotImg, spotImgUrl, imageChange, content, index);
            console.log(spotImgUrl);
        // }
        onCafeClose();
    };

    const region = travel.location.split(" ")[0];
    const constituency = travel.location.split(" ")[1];

    const [menu, setMenu] = useState();
    const [price, setPrice] = useState();
    const [content, setContent] = useState();

    // const getSpot = () => {
    //     if(type === "카페"){

    //     }
    //     try{
    //         const res = axios.get(`http://localhost:8080/api/v1/travelVisitorCafes/`)
    //     }
    // }

    useEffect(() => {
        if (!isCafeOpen) {
            setMenu('');
            setPrice('');
            setContent('');
            onCafeClose();
        } else {
            setMenu(travel.menu);
            setPrice(travel.price);
            setContent(travel.content);
        }
    }, [isCafeOpen, travel.menu, travel.price, travel.content, onCafeClose]);

    return (
        <ReactModal
            isOpen={isCafeOpen}
            onRequestClose={onCafeClose}
            style={modalStyles}
        >
            <div className="travelmodalcard-container">
                <div className="travelmodalcard">
                    <h3 className="travelmodalcard-title">{title}</h3>
                    <div className="travelmodalcard-body">
                        <p>지역: {region} {constituency}</p>
                        <p>운영 시간: {travel.opentime} ~ {travel.closetime}</p>
                        <div className="travelmodalcard-inputmodal">
                            {type === "카페" || type === "음식점" ? (
                                <input type="text" placeholder="메뉴" value={menu} name="menu" id="menuTModal" onChange={(e) => setMenu(e.target.value)}></input>
                            ) : null}
                            <input type="number" placeholder="지불한 가격" value={price} name="price" id="priceTModal" onChange={(e) => setPrice(e.target.value)}></input>
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
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="후기를 입력해주세요"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="travelmodalcard-bottom">
                        <button className="travelmodalcard-bottom-addbtn" onClick={handleItemClick}>수정</button>
                    </div>
                </div>
                <div className="modal-close">
                    <button onClick={handleClear}>닫기</button>
                </div>
            </div>
        </ReactModal>
    );
};

export default TravelModalCafeUpdate;