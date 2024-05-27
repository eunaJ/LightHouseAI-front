import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import ReactModal from "react-modal";
import axios from "axios";
import TravelModalCard from "./TravelModalCard";
import "./TravelModal.css";
import DaumPostcode from 'react-daum-postcode';
import StarbucksList from "./StarBuckList";

// 백그라운드 이미지 경로
import backgroundImage from '../../assets/img/background_img.png'; // 이미지 경로를 실제 이미지 경로로 대체하세요

function TravelModal({ constituency_id, type, isOpen, onClose, onCafeSpotAdd, onRestaurantSpotAdd, onShoppingMallSpotAdd, onTourListSpotAdd, onOtherServiceSpotAdd, index, selectedConstituency, location }) {
    const [searched, setSearched] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSpot, setNewSpot] = useState({
        title: '',
        location: location,
        opentime: '',
        closetime: '',
        constituency_name: selectedConstituency,
        constituency_id: constituency_id,
        item_id: null // 초기값을 null로 설정
    });
    const [selectedRegion, setSelectedRegion] = useState('');

    const fetchSearchResults = async (title) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/search?query=${selectedConstituency} ${title}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);
        if (searchText.trim() === '') {
            setIsSearching(false);
            setSearched([]);
        } else {
            setIsSearching(true);
            if (type === '카페') {
                const result = cafeList.filter((item) =>
                    item.title.includes(searchText)
                );
                setSearched(result);
            } else if (type === '음식점') {
                const result = restaurantList.filter((item) =>
                    item.title.includes(searchText)
                );
                setSearched(result);
            } else if (type === '쇼핑몰') {
                const result = shoppingmallList.filter((item) =>
                    item.title.includes(searchText)
                );
                setSearched(result);
            } else if (type === '관광지') {
                const result = tourlistList.filter((item) =>
                    item.title.includes(searchText)
                );
                setSearched(result);
            } else if (type === '기타서비스') {
                const result = otherserviceList.filter((item) =>
                    item.title.includes(searchText)
                );
                setSearched(result);
            }
        }
    };

    const [search, setSearch] = useState({});
    const [isSearching, setIsSearching] = useState(false);

    const [cafeList, setCafeList] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [shoppingmallList, setShoppingmallList] = useState([]);
    const [tourlistList, setTourlistList] = useState([]);
    const [otherserviceList, setOtherserviceList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (type === '카페') {
                try {
                    const res = await axios.get(`http://localhost:8080/api/v1/${constituency_id}/cafes`);
                    setCafeList(res.data);
                } catch (error) {
                    console.error('카페 데이터를 불러오는 중 오류 발생:', error);
                }
            } else if (type === '음식점') {
                try {
                    const res = await axios.get(`http://localhost:8080/api/v1/${constituency_id}/restaurants`);
                    setRestaurantList(res.data);
                } catch (error) {
                    console.error('음식점 데이터를 불러오는 중 오류 발생:', error);
                }
            } else if (type === '쇼핑몰') {
                try {
                    const res = await axios.get(`http://localhost:8080/api/v1/${constituency_id}/shoppingmalls`);
                    setShoppingmallList(res.data);
                } catch (error) {
                    console.error('쇼핑몰 데이터를 불러오는 중 오류 발생:', error);
                }
            } else if (type === '관광지') {
                try {
                    const res = await axios.get(`http://localhost:8080/api/v1/${constituency_id}/tourLists`);
                    setTourlistList(res.data);
                } catch (error) {
                    console.error('관광지 데이터를 불러오는 중 오류 발생:', error);
                }
            } else if (type === '기타서비스') {
                try {
                    const res = await axios.get(`http://localhost:8080/api/v1/${constituency_id}/otherServices`);
                    setOtherserviceList(res.data);
                } catch (error) {
                    console.error('기타서비스 데이터를 불러오는 중 오류 발생:', error);
                }
            }
        };
        fetchData();
    }, [type, isSearching, constituency_id]);

    const modalStyles = {
        overlay: {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        content: {
            width: '40%',
            height: '80%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // 중앙 정렬
            padding: '30px',
            background: 'rgba(255, 255, 255, 0.9)', // 약간의 투명도를 준 흰색 배경
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }
    };

    const [cafeSpot, setCafeSpot] = useState('');
    const [restaurantSpot, setRestaurantSpot] = useState('');
    const [shoppingMallSpot, setShoppingMallSpot] = useState('');
    const [tourListSpot, setTourListSpot] = useState('');
    const [otherServiceSpot, setOtherServiceSpot] = useState('');

    const handleCafeSpotAdd = (newSpot, spotImg, spotImgUrl, content) => {
        setCafeSpot(newSpot, spotImg, spotImgUrl, content);
        onCafeSpotAdd(newSpot, spotImg, spotImgUrl, content, index);
    }
    const handleRestaurantSpotAdd = (newSpot, spotImg, spotImgUrl, content) => {
        setRestaurantSpot(newSpot, spotImg, spotImgUrl, content);
        onRestaurantSpotAdd(newSpot, spotImg, spotImgUrl, content, index);
    }
    const handleShoppingMallSpotAdd = (newSpot, spotImg, spotImgUrl, content) => {
        setShoppingMallSpot(newSpot, spotImg, spotImgUrl, content);
        onShoppingMallSpotAdd(newSpot, spotImg, spotImgUrl, content, index);
    }
    const handleTourListSpotAdd = (newSpot, spotImg, spotImgUrl, content) => {
        setTourListSpot(newSpot, spotImg, spotImgUrl, content);
        onTourListSpotAdd(newSpot, spotImg, spotImgUrl, content, index);
    }
    const handleOtherServiceSpotAdd = (newSpot, spotImg, spotImgUrl, content) => {
        setOtherServiceSpot(newSpot, spotImg, spotImgUrl, content);
        onOtherServiceSpotAdd(newSpot, spotImg, spotImgUrl, content, index);
    }

    const [isNewSpot, setIsNewSpot] = useState(false);
    const [showPostcode, setShowPostcode] = useState(false); // 주소 검색 모달 상태

    const handleAddressSearch = async () => {
        await fetchSearchResults(newSpot.title);
        setShowPostcode(true);
    };

    const handleNewSpot = async (e) => {
        e.preventDefault();
        const newSpotData = {
            "title": newSpot.title,
            "location": newSpot.location,
            "opentime": newSpot.opentime,
            "closetime": newSpot.closetime,
            "constituency_name": selectedConstituency,
            "constituency_id": constituency_id,
            "item_id": newSpot.item_id
        };
        try {
            let res;
            if (type === "카페") {
                res = await axios.post('http://localhost:8080/api/v1/cafes/create', newSpotData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken'),
                    },
                })
            } else if (type === "음식점") {
                res = await axios.post('http://localhost:8080/api/v1/restaurants/create', newSpotData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken'),
                    },
                })
            } else if (type === "쇼핑몰") {
                res = await axios.post('http://localhost:8080/api/v1/shoppingmalls/create', newSpotData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken'),
                    },
                })
            } else if (type === "관광지") {
                res = await axios.post('http://localhost:8080/api/v1/tourLists/create', newSpotData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken'),
                    },
                })
            } else if (type === "기타서비스") {
                res = await axios.post('http://localhost:8080/api/v1/otherServices/create', newSpotData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken'),
                    },
                })
            }
            if (res.status === 201) {
                alert('등록되었습니다.');
                setSearched([]);
                setIsSearching(false);
            }
        } catch (e) {
            console.error('오류 발생:', e);
            alert(e.response.data.message);
        }
    }

    const handleClick = (index) => {
        console.log(index);
        const selectedLocation = data[index].address; // 선택한 주소 데이터
        setNewSpot({ ...newSpot, location: selectedLocation, item_id: index });
        setData([]); // 리스트 초기화
        setShowPostcode(false); // 주소 검색 모달 닫기
    };

    const handleClear = (e) => {
        setIsSearching(false);
        setSearched([]);
        setIsNewSpot(false);
        onClose();
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={modalStyles}
        >
            <div className="modal-search">
                <CiSearch className="modal-search-icon" />
                <input type="search" name="sv" className="modal-search-input" onChange={handleSearch} placeholder="   방문지를 검색해주세요" />
            </div>
            <div>
                {!isSearching ? (
                    type === '카페' ? (
                        cafeList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onCafeSpotToModal={handleCafeSpotAdd} onClose={onClose} location={travel.location} />
                        ))
                    ) : type === '음식점' ? (
                        restaurantList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onRestaurantSpotToModal={handleRestaurantSpotAdd} onClose={onClose} location={travel.location} />
                        ))
                    ) : type === '쇼핑몰' ? (
                        shoppingmallList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onShoppingMallSpotToModal={handleShoppingMallSpotAdd} onClose={onClose} location={travel.location} />
                        ))
                    ) : type === '관광지' ? (
                        tourlistList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onTourListSpotToModal={handleTourListSpotAdd} onClose={onClose} location={travel.location} />
                        ))
                    ) : type === '기타서비스' ? (
                        otherserviceList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onOtherServiceSpotToModal={handleOtherServiceSpotAdd} onClose={onClose} location={travel.location} />
                        ))
                    ) : null
                ) : (
                    searched.length === 0 ? (
                        <div>
                            <span>검색 결과가 없습니다</span>
                            <div className="modal-isadd">
                                <button className="modal-add-btn" onClick={(e) => setIsNewSpot(true)}>새로운 장소를 등록하시겠습니까?</button>
                            </div>
                            {isNewSpot &&
                                <div className="modal-newspotadd">
                                    <div className="modal-newspotadd-form" >
                                        <div className="modal-newspotadd-form-input">
                                            <label className="modal-newspotadd-form-label">이름 &nbsp;&nbsp;
                                                <input type="text" className="modal-newspotadd-title" placeholder="이름" value={newSpot.title}
                                                    onChange={(e) => setNewSpot({ ...newSpot, title: e.target.value })} />
                                            </label>
                                            <button type="button" onClick={handleAddressSearch}>주소 검색</button>
                                            {showPostcode && (
                                                <div>
                                                    <h1>매장 목록</h1>
                                                    <StarbucksList data={data} handleClick={handleClick} />
                                                    <button onClick={() => setShowPostcode(false)}>취소</button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="modal-newspotadd-form-input">
                                            <label className="modal-newspotadd-form-label">위치 &nbsp;&nbsp;
                                                <input type="text" className="modal-newspotadd-location" placeholder="위치" value={newSpot.location}
                                                    onChange={(e) => setNewSpot({ ...newSpot, location: e.target.value })} />
                                            </label>
                                        </div>
                                        <div className="modal-newspotadd-form-input">
                                            <label className="modal-newspotadd-form-label">영업시간 &nbsp;&nbsp;
                                                <input type="text" className="modal-newspotadd-opentime" placeholder="00:00" value={newSpot.opentime}
                                                    onChange={(e) => setNewSpot({ ...newSpot, opentime: e.target.value })} />
                                            </label>
                                        </div>
                                        <div className="modal-newspotadd-form-input">
                                            <label className="modal-newspotadd-form-label">마감시간 &nbsp;&nbsp;
                                                <input type="text" className="modal-newspotadd-closetime" placeholder="00:00" value={newSpot.closetime}
                                                    onChange={(e) => setNewSpot({ ...newSpot, closetime: e.target.value })} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="modal-newspotadd-save">
                                        <button className="modal-newspotadd-save-btn" onClick={handleNewSpot}>새로운 {type} 등록</button>
                                    </div>
                                </div>
                            }
                        </div>
                    ) : (
                        searched.map((travel, index) => (
                            <TravelModalCard {...travel} />
                        ))
                    )
                )}
            </div>
            <div className="modal-close">
                <button onClick={handleClear}>닫기</button>
            </div>
        </ReactModal>
    );
}

export default TravelModal;