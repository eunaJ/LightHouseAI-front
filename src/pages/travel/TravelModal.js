import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import ReactModal from "react-modal";
import api from "../../components/RefreshApi";
import axios from "axios";
import TravelModalCard from "./TravelModalCard";
import "./TravelModal.css";
import { areas } from "../../components/travel/Areas";
import DaumPostcode from 'react-daum-postcode';

function TravelModal({constituency_id, type, isOpen, onClose, onCafeSpotAdd, onRestaurantSpotAdd, onShoppingMallSpotAdd, onTourListSpotAdd, onOtherServiceSpotAdd, index }) {
    const [searched, setSearched] = useState([]);
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
    }

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
                    console.log(constituency_id);
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
        content: {
            width: '40%',
            height: '80%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // 중앙 정렬
            padding: '30px'
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

    const [newSpot, setNewSpot] = useState({
        title: '',
        location: '',
        opentime: '',
        closetime: '',
        constituency_name: ''
    });
    const [isNewSpot, setIsNewSpot] = useState(false);
    const [showPostcode, setShowPostcode] = useState(false); // 주소 검색 모달 상태

    const handleNewSpot = async (e) => {
        e.preventDefault();
        const newSpotData = {
            "title": newSpot.title,
            "location": newSpot.location,
            "opentime": newSpot.opentime,
            "closetime": newSpot.closetime,
            "constituency_name": selectedConstituency
        };
        try {
            let res;
            if (type === "카페") {
                res = await api.post('http://localhost:8080/api/v1/cafes/create', newSpotData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken'),
                    },
                })
            } else if (type === "음식점") {
                res = await api.post('http://localhost:8080/api/v1/restaurants/create', newSpotData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken'),
                    },
                })
            } else if (type === "쇼핑몰") {
                res = await api.post('http://localhost:8080/api/v1/shoppingmalls/create', newSpotData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken'),
                    },
                })
            } else if (type === "관광지") {
                res = await api.post('http://localhost:8080/api/v1/tourLists/create', newSpotData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken'),
                    },
                })
            } else if (type === "기타서비스") {
                res = await api.post('http://localhost:8080/api/v1/otherServices/create', newSpotData, {
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

    const onCompletePost = (data) => {
        setShowPostcode(false);
        setNewSpot({ ...newSpot, location: data.address });

        const addressParts = data.address.split(' ');
        if (addressParts.length >= 2) {
            setSelectedRegion(addressParts[0]);
            setSelectedConstituency(addressParts[1]);
        }
    };

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

    const handleClear = (e) => {
        setIsSearching(false);
        setSearched([]);
        setIsNewSpot(false);
        onClose();
    }

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
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onCafeSpotToModal={handleCafeSpotAdd} onClose={onClose} />
                        ))
                    ) : type === '음식점' ? (
                        restaurantList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onRestaurantSpotToModal={handleRestaurantSpotAdd} onClose={onClose} />
                        ))
                    ) : type === '쇼핑몰' ? (
                        shoppingmallList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onShoppingMallSpotToModal={handleShoppingMallSpotAdd} onClose={onClose} />
                        ))
                    ) : type === '관광지' ? (
                        tourlistList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onTourListSpotToModal={handleTourListSpotAdd} onClose={onClose} />
                        ))
                    ) : type === '기타서비스' ? (
                        otherserviceList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onOtherServiceSpotToModal={handleOtherServiceSpotAdd} onClose={onClose} />
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
                                        </div>
                                        <div className="modal-newspotadd-form-input">
                                            <label className="modal-newspotadd-form-label">위치 &nbsp;&nbsp;
                                                <input type="text" className="modal-newspotadd-location" placeholder="위치" value={newSpot.location}
                                                    onChange={(e) => setNewSpot({ ...newSpot, location: e.target.value })} />
                                                <button type="button" onClick={() => setShowPostcode(true)}>주소 검색</button>
                                                {showPostcode && (
                                                    <div>
                                                        <DaumPostcode
                                                            onComplete={onCompletePost}
                                                            style={{ width: '100%', height: '400px' }}
                                                        />
                                                        <button onClick={() => setShowPostcode(false)}>취소</button>
                                                    </div>
                                                )}
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
                                        <div className='modal-newspotadd-region-select'>
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
                                    </div>
                                    <div className="modal-newspotadd-save">
                                        <button className="modal-newspotadd-save-btn" onClick={handleNewSpot}>새로운 {type} 등록</button>
                                    </div>
                                </div>
                            }
                        </div>
                    ) : (
                        searched.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} />
                        ))
                    )
                )}
            </div>
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
                        </div>
                        <div className="modal-newspotadd-form-input">
                            <label className="modal-newspotadd-form-label">위치 &nbsp;&nbsp;
                                <input type="text" className="modal-newspotadd-location" placeholder="위치" value={newSpot.location}
                                    onChange={(e) => setNewSpot({ ...newSpot, location: e.target.value })} />
                                <button type="button" onClick={() => setShowPostcode(true)}>주소 검색</button>
                                {showPostcode && (
                                    <div>
                                        <DaumPostcode
                                            onComplete={onCompletePost}
                                            style={{ width: '100%', height: '400px' }}
                                        />
                                        <button onClick={() => setShowPostcode(false)}>취소</button>
                                    </div>
                                )}
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
                        <div className='modal-newspotadd-region-select'>
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
                    </div>
                    <div className="modal-newspotadd-save">
                        <button className="modal-newspotadd-save-btn" onClick={handleNewSpot}>새로운 {type} 등록</button>
                    </div>
                    <div className="modal-newspotadd-save">
                        <button className="modal-newspotadd-save-btn" onClick={() => setIsNewSpot(false)}>취소</button>
                    </div>
                </div>
            }
            <div className="modal-close">
                <button onClick={handleClear}>닫기</button>
            </div>
        </ReactModal>
    );
}

export default TravelModal;
