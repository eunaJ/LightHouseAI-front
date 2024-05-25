import { useRef, useState } from "react";
import "./TravelModalCard.css";

const TravelModalCard = ({ id, type, title, opentime, closetime, constituency_name, region_name, onCafeSpotToModal, onRestaurantSpotToModal, onShoppingMallSpotToModal, onTourListSpotToModal, onOtherServiceSpotToModal, onClose, menus, prices, contents, location }) => {
    const upload = useRef();
    const [spotImg, setSpotImg] = useState('');
    const [spotImgUrl, setSpotImgUrl] = useState('');
    const handleSpotImgChange = (e) => {
        const img = upload.current.files[0];
        setSpotImg(img);
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
            setSpotImgUrl(reader.result);
        };
    };

    const handleItemClick = (e) => {
        const spotData = {
            menu: menu,
            price: price,
            opentime: opentime,
            closetime: closetime,
            location: location,
            title: title,
            type: type
        }
        e.preventDefault();
        if(type === "카페") {
            onCafeSpotToModal(spotData, spotImg, spotImgUrl, content);
        }
        else if(type === "음식점") {
            onRestaurantSpotToModal(spotData, spotImg, spotImgUrl, content);
        }
        else if(type === "쇼핑몰") {
            onShoppingMallSpotToModal(spotData, spotImg, spotImgUrl, content);
        }
        else if(type === "관광지") {
            onTourListSpotToModal(spotData, spotImg, spotImgUrl, content);
        }
        else if(type === "기타서비스") {
            onOtherServiceSpotToModal(spotData, spotImg, spotImgUrl, content);
        }
        onClose();
    };

    const [menu, setMenu] = useState(menus);
    const [price, setPrice] = useState(prices);
    const [content, setcontent] = useState(contents);

    return (
        <div className="travelmodalcard-container">
            <div className="travelmodalcard">
                <h3 className="travelmodalcard-title">{title}</h3>
                <div className="travelmodalcard-body">
                    <p>지역: {location}</p>
                    <p>운영 시간: {opentime} ~ {closetime}</p>
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
                                onChange={(e) => setcontent(e.target.value)}
                                placeholder="후기를 입력해주세요"
                            />
                        </div>
                    </div>
                </div>
                <div className="travelmodalcard-bottom">
                    <button className="travelmodalcard-bottom-addbtn" onClick={handleItemClick}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default TravelModalCard;