import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import ReactModal from "react-modal";
import api from "../../components/RefreshApi";
import axios from "axios";
import TravelCard from "../../components/travel/TravelCard";
import TravelModalCard from "./TravelModalCard";
import "./TravelModal.css";

function TravelModal({ type, isOpen, onClose, onSpotAdd, index }) {
    // const travelSpotsByType = {
    //     '카페': ['카페A', '카페B', '카페C'],
    //     '쇼핑몰': ['쇼핑몰A', '쇼핑몰B', '쇼핑몰C'],
    //     '식당': ['식당A', '식당B', '식당C']
    // };

    // const spots = travelSpotsByType[type] || [];

    // const handleItemClick = (spot) => {
    //     onItemSelect(spot);
    // };

    // const setSpotData = (spot) => {
    //     onItemSelect(spot);
    // }

    const [searched, setSearched] = useState([]);
    const handleSearch = (e) => {
        // 영어인 경우 대소문자 구분 중, 애초에 title이 구분 중
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
                    const res = await axios.get('http://localhost:8080/api/v1/cafes');
                    setCafeList(res.data);
                } catch (error) {
                    console.error('카페 데이터를 불러오는 중 오류 발생:', error);
                }
            } else if (type === '음식점') {
                try {
                    const res = await axios.get('http://localhost:8080/api/v1/restaurants/');
                    setRestaurantList(res.data);
                    console.log(res.data);
                } catch (error) {
                    console.error('음식점 데이터를 불러오는 중 오류 발생:', error);
                }
            } else if (type === '쇼핑몰') {
                try {
                    const res = await axios.get('http://localhost:8080/api/v1/shoppingmalls');
                    setShoppingmallList(res.data);
                    console.log(res.data);
                } catch (error) {
                    console.error('쇼핑몰 데이터를 불러오는 중 오류 발생:', error);
                }
            } else if (type === '관광지') {
                try {
                    const res = await axios.get('http://localhost:8080/api/v1/tourLists');
                    setTourlistList(res.data);
                    console.log(res.data);
                } catch (error) {
                    console.error('관광지 데이터를 불러오는 중 오류 발생:', error);
                }
            } else if (type === '기타서비스') {
                try {
                    const res = await axios.get('http://localhost:8080/api/v1/otherServices');
                    setOtherserviceList(res.data);
                    console.log(res.data);
                } catch (error) {
                    console.error('쇼핑몰 데이터를 불러오는 중 오류 발생:', error);
                }
            }
        };
        fetchData();
    }, [type]);

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

    const [spot, setSpot] = useState('');

    const handleSpotAdd = (newSpot, spotImg, review) => {
        setSpot(newSpot, spotImg, review);
        onSpotAdd(newSpot, spotImg, review, index);
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

            {/* <div className="modal-search">
                <CiSearch className="modal-search-icon" style={searchIconStyle}/>
                <input type="search" name="sv" className="modal-search-input" onChange={handleSearch} style={searchStyle} placeholder="   방문지를 검색해주세요" />
            </div> */}
            {/* <h2>{type} 선택</h2>
            <ul>
                {spots.map((spot, index) => (
                    <li key={index} onClick={() => handleItemClick(spot)}>
                        {spot}
                    </li>
                ))}
            </ul> */}
            <div>
                {!isSearching ? (
                    type === '카페' ? (
                        cafeList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onSpotToModal={handleSpotAdd} onClose={onClose} />
                        ))
                    ) : type === '음식점' ? (
                        restaurantList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onSpotToModal={handleSpotAdd} onClose={onClose} />
                        ))
                    ) : type === '쇼핑몰' ? (
                        shoppingmallList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onSpotToModal={handleSpotAdd} onClose={onClose} />
                        ))
                    ) : type === '관광지' ? (
                        tourlistList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onSpotToModal={handleSpotAdd} onClose={onClose} />
                        ))
                    ) : type === '기타서비스' ? (
                        otherserviceList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onSpotToModal={handleSpotAdd} onClose={onClose} />
                        ))
                    ) : null
                ) : (
                    searched.length === 0 ? (
                        <span>검색 결과가 없습니다</span>
                    ) : (
                        searched.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} />
                        ))
                        // type === '카페' ? (
                        //     searched.map((travel) => (
                        //         <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} />
                        //     ))
                        // ) : type === '음식점' ? (
                        //     restaurantList.map((travel) => (
                        //         <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} />
                        //     ))
                        // ) : type === '쇼핑몰' ? (
                        //     shoppingmallList.map((travel) => (
                        //         <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} />
                        //     ))
                        // ) : type === '관광지' ? (
                        //     tourlistList.map((travel) => (
                        //         <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onSpotToModal={handleSpotAdd} onClose={onClose} />
                        //     ))
                        // ) : type === '기타서비스' ? (
                        //     otherserviceList.map((travel) => (
                        //         <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onSpotToModal={handleSpotAdd} onClose={onClose} />
                        //     ))
                        // ) : null
                    )
                )}


                {/* {!isSearching ? (
                    cafeList.map((travel) => (
                        <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name} onItemSelect={travel.onItemSelect} onSpotToModal={handleSpotAdd} onClose={onClose}/>
                    ))
                ) : (
                    searched.length === 0 ? (
                        <span>검색 결과가 없습니다</span>
                    ) : (
                        cafeList.map((travel) => (
                            <TravelModalCard key={travel.id} type={type} title={travel.title} opentime={travel.opentime} closetime={travel.closetime} constituency_name={travel.constituency_name} region_name={travel.region_name}  />
                        ))
                    )
                )} */}
            </div>
            <button onClick={onClose}>닫기</button>
        </ReactModal>
    );
    // const travelSpots = ['파리', '뉴욕', '도쿄', '런던'];  // 간단한 여행지 목록 예시

    // const handleItemClick = (spot) => {
    //     onItemSelect(spot);
    // };

    // return (
    //     <ReactModal
    //         isOpen={isOpen}
    //         onRequestClose={onClose}
    //     >
    //         <h2>여행지 선택</h2>
    //         <ul>
    //             {travelSpots.map((spot, index) => (
    //                 <li key={index} onClick={() => handleItemClick(spot)}>
    //                     {spot}
    //                 </li>
    //             ))}
    //         </ul>
    //         <button onClick={onClose}>닫기</button>
    //     </ReactModal>
    // );
}

export default TravelModal;