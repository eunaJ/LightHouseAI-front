import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import lighthouseaiLogo from '../../assets/img/lighthouseai_logo.png';
import axios from "axios";
import "./TravelUpdate.css";
import api from "../../components/RefreshApi";

const TravelUpdate = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [travel, setTravel] = useState({});
    const [travelCafe, setTravelCafe] = useState([]);
    const [travelRestaurant, setTravelRestaurant] = useState([]);
    const [travelShoppingMall, setTravelShoppingMall] = useState([]);
    const [travelTourList, setTravelTourList] = useState([]);
    const [travelOtherService, setTravelOtherService] = useState([]);

    const [travelTitle, setTravelTitle] = useState('');
    const [travelWriter, setTravelWriter] = useState('');
    const [travelImgInit, setTravelImgInit] = useState('');
    const [travelImg, setTravelImg] = useState('');
    const [travelImgUrl, setTravelImgUrl] = useState('');
    const [isImgChange, setIsImgChange] = useState(false);

    const [travelServing, setTravelServing] = useState(0);
    const [travelConstituency, setTravelConstituency] = useState('');

    const [img, setImg] = useState('');

    const [starCount, setStarcount] = useState(0);
    let starColor = starCount * 20 + "%";

    const navigate = useNavigate();
    const gotoHome = () => {
        navigate('/');
    }

    const [travelId, setTravelId] = useState(0);

    const getTravel = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/travels/${id}`);
            setTravel(res.data);
            const visitorId = res.data.id;
            setTravelId(res.data.id);
            setTravelTitle(res.data.title);
            setTravelWriter(res.data.writer);
            setTravelServing(res.data.serving);
            setTravelConstituency(res.data.constituency_name);
            if (res.data.image_url !== null) {
                if (res.data.image_url.includes('.png') || res.data.image_url.includes('.jpeg') || res.data.image_url.includes('.jpg')) {
                    setTravelImgInit(res.data.image_url);
                    setTravelImgUrl(res.data.image_url);
                }
            }
            setStarcount(res.data.star);
            starColor = res.data.star * 20 + "%";

            const resTravelCafe = await axios.get(`http://localhost:8080/api/v1/travelVisitorCafes/travel/${visitorId}`);
            setTravelCafe(resTravelCafe.data);
            const resTravelRestaurant = await axios.get(`http://localhost:8080/api/v1/travelVisitorRestaurants/travel/${visitorId}`);
            setTravelRestaurant(resTravelRestaurant.data);
            const resTravelShoppingMall = await axios.get(`http://localhost:8080/api/v1/travelVisitorShoppingMalls/travel/${visitorId}`);
            setTravelShoppingMall(resTravelShoppingMall.data);
            const resTravelTourList = await axios.get(`http://localhost:8080/api/v1/travelVisitorTourLists/travel/${visitorId}`);
            setTravelTourList(resTravelTourList.data);
            const resTravelOtherService = await axios.get(`http://localhost:8080/api/v1/travelVisitorOtherServices/travel/${visitorId}`);
            setTravelOtherService(resTravelOtherService.data);
            setLoading(false);
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
    };

    const [isTravelImgChange, setIsTravelImgChange] = useState(false);
    const handleTravelImgChange = (e) => {
        setTravelImg(e.target.files[0]);
        setIsTravelImgChange(true);
    };
    const handleImgChange = (e) => {
        setImg(e.target.files[0]);
        setIsImgChange(true);
    };

    const removeCafeContentField = (index) => {
        const newContents = [...travelCafe];
        newContents.splice(index, 1);
        try {
            if (travelCafe[index].id) {
                const res = api.delete(`http://localhost:8080/api/v1/travelVisitorCafes/${travelCafe[index].id}`);
            }
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
        setTravelCafe(newContents);
    };
    const removeRestaurantContentField = (index) => {
        const newContents = [...travelRestaurant];
        newContents.splice(index, 1);
        try {
            if (travelRestaurant[index].id) {
                const res = api.delete(`http://localhost:8080/api/v1/travelVisitorRestaurants/${travelRestaurant[index].id}`);
            }
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
        setTravelRestaurant(newContents);
    };
    const removeShoppingMallContentField = (index) => {
        const newContents = [...travelShoppingMall];
        newContents.splice(index, 1);
        try {
            if (travelShoppingMall[index].id) {
                const res = api.delete(`http://localhost:8080/api/v1/travelVisitorShoppingMalls/${travelShoppingMall[index].id}`);
            }
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
        setTravelShoppingMall(newContents);
    };
    const removeTourListContentField = (index) => {
        const newContents = [...travelTourList];
        newContents.splice(index, 1);
        try {
            if (travelTourList[index].id) {
                const res = api.delete(`http://localhost:8080/api/v1/travelVisitorTourLists/${travelTourList[index].id}`);
            }
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
        setTravelTourList(newContents);
    };
    const removeOtherServiceContentField = (index) => {
        const newContents = [...travelOtherService];
        newContents.splice(index, 1);
        try {
            if (travelOtherService[index].id) {
                const res = api.delete(`http://localhost:8080/api/v1/travelVisitorOtherServices/${travelOtherService[index].id}`);
            }
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
        setTravelOtherService(newContents);
    };

    const updateCafeContentField = async (cafe, index) => {
        const updatedContents = [...travelCafe];
        updatedContents[index] = {
            ...updatedContents[index - 1],
            id: cafe.id,
            menu: cafe.menu,
            price: cafe.price,
            opentime: cafe.opentime,
            closetime: cafe.closetime,
            location: cafe.location,
            cafe_title: cafe.cafe_title,
            image_url: img,
            content: cafe.content,
            imageChange: isImgChange
        }
        setTravelCafe(updatedContents);
        const formData = new FormData();
        formData.append("controllerRequestDto", new Blob([JSON.stringify(updatedContents[index])], { type: 'application/json' }));
        if (isImgChange) {
            if (img) {
                formData.append("multipartFile", img);
            } else {
                formData.append('multipartFile', new Blob(), '');
            }
        }
        try {
            const res = await api.put(`http://localhost:8080/api/v1/travelVisitorCafes/${cafe.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data;",
                    'Authorization': localStorage.getItem('accessToken')
                },
            });
            if (res.status === 200) {
                alert('수정이 완료되었습니다.');
                navigate('/travel/' + id);
            }
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
        setImg('');
        setIsImgChange(false);
    }
    const updateRestaurantContentField = async (restaurant, index) => {
        const updatedContents = [...travelRestaurant];
        updatedContents[index] = {
            ...updatedContents[index - 1],
            id: restaurant.id,
            menu: restaurant.menu,
            price: restaurant.price,
            opentime: restaurant.opentime,
            closetime: restaurant.closetime,
            location: restaurant.location,
            restaurant_title: restaurant.restaurant_title,
            image_url: img,
            content: restaurant.content,
            imageChange: isImgChange
        }
        setTravelRestaurant(updatedContents);
        const formData = new FormData();
        formData.append("controllerRequestDto", new Blob([JSON.stringify(updatedContents[index])], { type: 'application/json' }));
        if (isImgChange) {
            if (img) {
                formData.append("multipartFile", img);
            } else {
                formData.append('multipartFile', new Blob(), '');
            }
        }
        try {
            const res = await api.put(`http://localhost:8080/api/v1/travelVisitorRestaurants/${restaurant.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data;",
                    'Authorization': localStorage.getItem('accessToken')
                },
            });
            if (res.status === 200) {
                alert('수정이 완료되었습니다.');
                navigate('/travel/' + id);
            }
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
        setImg('');
        setIsImgChange(false);
    }
    const updateShoppingMallContentField = async (shoppingMall, index) => {
        const updatedContents = [...travelShoppingMall];
        updatedContents[index] = {
            ...updatedContents[index - 1],
            id: shoppingMall.id,
            price: shoppingMall.price,
            opentime: shoppingMall.opentime,
            closetime: shoppingMall.closetime,
            location: shoppingMall.location,
            shoppingMall_title: shoppingMall.shoppingMall_title,
            image_url: img,
            content: shoppingMall.content,
            imageChange: isImgChange
        }
        setTravelShoppingMall(updatedContents);
        const formData = new FormData();
        formData.append("controllerRequestDto", new Blob([JSON.stringify(updatedContents[index])], { type: 'application/json' }));
        if (isImgChange) {
            if (img) {
                formData.append("multipartFile", img);
            } else {
                formData.append('multipartFile', new Blob(), '');
            }
        }
        try {
            const res = await api.put(`http://localhost:8080/api/v1/travelVisitorShoppingMalls/${shoppingMall.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data;",
                    'Authorization': localStorage.getItem('accessToken')
                },
            });
            if (res.status === 200) {
                alert('수정이 완료되었습니다.');
                navigate('/travel/' + id);
            }
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
        setImg('');
        setIsImgChange(false);
    }
    const updateTourListContentField = async (tourList, index) => {
        const updatedContents = [...travelTourList];
        updatedContents[index] = {
            ...updatedContents[index - 1],
            id: tourList.id,
            price: tourList.price,
            opentime: tourList.opentime,
            closetime: tourList.closetime,
            location: tourList.location,
            tourList_title: tourList.tourList_title,
            image_url: img,
            content: tourList.content,
            imageChange: isImgChange
        }
        setTravelTourList(updatedContents);
        const formData = new FormData();
        formData.append("controllerRequestDto", new Blob([JSON.stringify(updatedContents[index])], { type: 'application/json' }));
        if (isImgChange) {
            if (img) {
                formData.append("multipartFile", img);
            } else {
                formData.append('multipartFile', new Blob(), '');
            }
        }
        try {
            const res = await api.put(`http://localhost:8080/api/v1/travelVisitorTourLists/${tourList.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data;",
                    'Authorization': localStorage.getItem('accessToken')
                },
            });
            if (res.status === 200) {
                alert('수정이 완료되었습니다.');
                navigate('/travel/' + id);
            }
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
        setImg('');
        setIsImgChange(false);
    }
    const updateOtherServiceContentField = async (otherService, index) => {
        const updatedContents = [...travelOtherService];
        if (isImgChange === null) {
            isImgChange = false;
        }
        updatedContents[index] = {
            ...updatedContents[index - 1],
            id: otherService.id,
            price: otherService.price,
            opentime: otherService.opentime,
            closetime: otherService.closetime,
            location: otherService.location,
            otherService_title: otherService.otherService_title,
            image_url: img,
            content: otherService.content,
            imageChange: isImgChange
        }
        setTravelOtherService(updatedContents);
        const formData = new FormData();
        formData.append("controllerRequestDto", new Blob([JSON.stringify(updatedContents[index])], { type: 'application/json' }));
        if (isImgChange) {
            if (img) {
                formData.append("multipartFile", img);
            } else {
                formData.append('multipartFile', new Blob(), '');
            }
        }
        try {
            const res = await api.put(`http://localhost:8080/api/v1/travelVisitorOtherServices/${otherService.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data;",
                    'Authorization': localStorage.getItem('accessToken')
                },
            });
            if (res.status === 200) {
                alert('수정이 완료되었습니다.');
                navigate('/travel/' + id);
            }
        } catch (e) {
            console.error(e);
            alert(e.response.data.message);
        }
        setImg('');
        setIsImgChange(false);
    }

    const handleCafeInputChange = (e, index, field) => {
        const updatedContents = [...travelCafe];
        updatedContents[index] = {
            ...updatedContents[index],
            [field]: e.target.value,
        };
        setTravelCafe(updatedContents);
    };
    const handleRestaurantInputChange = (e, index, field) => {
        const updatedContents = [...travelRestaurant];
        updatedContents[index] = {
            ...updatedContents[index],
            [field]: e.target.value,
        };
        setTravelRestaurant(updatedContents);
    };
    const handleShoppingMallInputChange = (e, index, field) => {
        const updatedContents = [...travelShoppingMall];
        updatedContents[index] = {
            ...updatedContents[index],
            [field]: e.target.value,
        };
        setTravelShoppingMall(updatedContents);
    };
    const handleTourListInputChange = (e, index, field) => {
        const updatedContents = [...travelTourList];
        updatedContents[index] = {
            ...updatedContents[index],
            [field]: e.target.value,
        };
        setTravelTourList(updatedContents);
    };
    const handleOtherServiceInputChange = (e, index, field) => {
        const updatedContents = [...travelOtherService];
        updatedContents[index] = {
            ...updatedContents[index],
            [field]: e.target.value,
        };
        setTravelOtherService(updatedContents);
    };

    const handleSubmit = async (e) => {
        try {
            const travelData = {
                "title": travelTitle,
                "serving": travelServing,
                "constituency": travelConstituency,
                "star": starCount,
                'imageChange': isTravelImgChange
            };
            const formData = new FormData();
            formData.append("controllerRequestDto", new Blob([JSON.stringify(travelData)], { type: 'application/json' }));
            if (isTravelImgChange) {
                if (travelImg) {
                    formData.append("multipartFile", travelImg);
                } else {
                    formData.append('multipartFile', new Blob(), '');
                }
            }
            const res = await api.put(`http://localhost:8080/api/v1/travels/${id}`, formData, {
                headers: {
                    'Authorization': localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data'
                },
            })
            if (res.status === 200) {
                alert('수정되었습니다.');
                navigate('/travel/' + id);
            }
        } catch (e) {
            console.error('오류 발생:', e);
            alert(e.response.data.message);
        }
    }

    useEffect(() => {
        getTravel();
    }, []);

    useEffect(() => {
    }, [starColor, travelCafe, travelRestaurant, travelShoppingMall, travelTourList, travelOtherService]);

    return (
        <div>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <div className="travelupdate">
                    <div className='travelupdate-top'>
                        <div className='travelupdate-logo'>
                            <img src={lighthouseaiLogo} alt="로고" height={"100px"} id='lighthouseaiLogo' onClick={gotoHome}></img>
                        </div>
                        <div className='travelupdate-traveltitle'>
                            <input type='text' placeholder='제목' className='travelupdate-traveltitle-input' value={travelTitle}
                                name="travelTitle"
                                id="titleTravel"
                                onChange={(e) => setTravelTitle(e.target.value)}
                                required></input>
                        </div>
                    </div>
                    <div className="travelupdate-inner">
                        <p style={{ textAlign: 'left' }}>작성자: {travel.writer}</p>
                        <p style={{ textAlign: 'left' }}>시/군/구: {travel.constituency_name}</p>
                        <div className="travelupdate-inner-main">
                            <div className='travelupdate-travelimg'>
                                <input
                                    className="travelupdate-img-input"
                                    type="file"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={handleTravelImgChange}
                                />
                            </div>
                            <div className='travelupdate-serving-div'>
                                <label>인원: <input className="travelupdate-serving-input" type="number" name="serving" value={travelServing} onChange={(e) => setTravelServing(e.target.value)}></input></label>
                            </div>
                            <div className='travelupdate-star-container'>
                                <span className="travelupdate-star">
                                    ★★★★★
                                    <span className='travelupdate-star-span'>★★★★★</span>
                                    <input
                                        className='travelupdate-star-input'
                                        type="range"
                                        onChange={(e) => setStarcount(e.target.value)}
                                        onMouseUp={(e) => setStarcount(e.target.value)}
                                        onTouchEnd={(e) => setStarcount(e.target.value)}
                                        step="1"
                                        min="0"
                                        max="5"
                                    />
                                </span>
                                <style jsx>{`
                        .travelupdate-star-span {
                            left: 0;
                            width: ${starColor};
                            position: absolute;
                            color: #ffd700;
                            overflow: hidden;
                            pointer-events: none;
                        }
                        `}</style>
                            </div>
                            <div className='travelupdate-btn-div'>
                                <button className="travelupdate-btn" type="submit" onClick={handleSubmit}>저장</button>
                            </div>
                            {travelCafe.map((content, index) => (
                                <div key={index}>
                                    {index === 0 && <hr></hr>}
                                    {travelCafe[index].location && index >= -1 &&
                                        <div className='travelupdate-card'>
                                            <h3>{travelCafe[index].cafe_title}</h3>
                                            <div className="travelupdate-img">
                                                <label className="travelupdate-img-btn">
                                                    <input
                                                        className="travelupdate-img-input"
                                                        type="file"
                                                        accept=".png, .jpeg, .jpg"
                                                        onChange={handleImgChange}
                                                    />
                                                </label>
                                            </div>
                                            <p>위치: {travelCafe[index].location}</p>
                                            <p>운영시간: {travelCafe[index].opentime} ~ {travelCafe[index].closetime}</p>
                                            <div className='travelupdate-div'>
                                                <label>메뉴: <input className="travelupdate-input" type="text" value={travelCafe[index].menu} name="menu" onChange={(e) => handleCafeInputChange(e, index, 'menu')}></input></label>
                                            </div>
                                            <div className='travelupdate-div'>
                                                <label>가격: <input className="travelupdate-input" type="number" value={travelCafe[index].price} name="price" onChange={(e) => handleCafeInputChange(e, index, 'price')}></input></label>
                                            </div>
                                            <div className='travelupdate-div'>
                                                <textarea
                                                    className='travelupdate-textarea-input'
                                                    value={travelCafe[index].content ? travelCafe[index].content : ''}
                                                    onChange={(e) => handleCafeInputChange(e, index, 'content')}
                                                    placeholder="후기를 입력해주세요"
                                                />
                                            </div>
                                        </div>}
                                    <div className="travelupdate-btn-div">
                                        {index >= 0 && travelCafe[index].id && <button className='travelupdate-btn' type="button" onClick={() => updateCafeContentField(travelCafe[index], index)}>수정</button>}
                                        {index >= 0 && <button className='travelupdate-btn' type="button" onClick={() => removeCafeContentField(index)}>삭제</button>}
                                    </div>
                                </div>
                            ))}
                            {travelRestaurant.map((content, index) => (
                                <div key={index}>
                                    {index === 0 && <hr></hr>}
                                    {travelRestaurant[index].location && index >= -1 &&
                                        <div className='travelupdate-card'>
                                            <h3>{travelRestaurant[index].restaurant_title}</h3>
                                            <div className="travelupdate-img">
                                                <label className="travelupdate-img-btn">
                                                    <input
                                                        className="travelupdate-img-input"
                                                        type="file"
                                                        accept=".png, .jpeg, .jpg"
                                                        onChange={handleImgChange}
                                                    />
                                                </label>
                                            </div>
                                            <p>위치: {travelRestaurant[index].location}</p>
                                            <p>운영시간: {travelRestaurant[index].opentime} ~ {travelRestaurant[index].closetime}</p>
                                            <div className='travelupdate-div'>
                                                <label>메뉴: <input className="travelupdate-div-input" type="text" value={travelRestaurant[index].menu} name="menu" onChange={(e) => handleRestaurantInputChange(e, index, 'menu')}></input></label>
                                            </div>
                                            <div className='travelupdate-div'>
                                                <label>가격: <input className="travelupdate-div-input" type="number" value={travelRestaurant[index].price} name="price" onChange={(e) => handleRestaurantInputChange(e, index, 'price')}></input></label>
                                            </div>
                                            <div className='travelupdate-div'>
                                                <textarea
                                                    className='travelupdate-textarea-input'
                                                    value={travelRestaurant[index].content ? travelRestaurant[index].content : ''}
                                                    onChange={(e) => handleRestaurantInputChange(e, index, 'content')}
                                                    placeholder="후기를 입력해주세요"
                                                />
                                            </div>
                                        </div>}
                                    <div className="travelupdate-btn-div">
                                        {index >= 0 && travelRestaurant[index].id && <button className='travelupdate-btn' type="button" onClick={() => updateRestaurantContentField(travelRestaurant[index], index)}>수정</button>}
                                        {index >= 0 && <button className='travelupdate-btn' type="button" onClick={() => removeRestaurantContentField(index)}>삭제</button>}
                                    </div>
                                </div>
                            ))}
                            {travelShoppingMall.map((content, index) => (
                                <div key={index}>
                                    {index === 0 && <hr></hr>}
                                    {travelShoppingMall[index].location && index >= -1 &&
                                        <div className='travelupdate-card'>
                                            <h3>{travelShoppingMall[index].shoppingMall_title}</h3>
                                            <div className="travelupdate-img">
                                                <label className="travelupdate-img-btn">
                                                    <input
                                                        className="travelupdate-img-input"
                                                        type="file"
                                                        accept=".png, .jpeg, .jpg"
                                                        onChange={handleImgChange}
                                                    />
                                                </label>
                                            </div>
                                            <p>위치: {travelShoppingMall[index].location}</p>
                                            <p>운영시간: {travelShoppingMall[index].opentime} ~ {travelShoppingMall[index].closetime}</p>
                                            <div className='travelupdate-div'>
                                                <label>가격: <input className="travelupdate-input" type="number" value={travelShoppingMall[index].price} name="price" onChange={(e) => handleShoppingMallInputChange(e, index, 'price')}></input></label>
                                            </div>
                                            <div className='travelupdate-div'>
                                                <textarea
                                                    className='travelupdate-textarea-input'
                                                    value={travelShoppingMall[index].content ? travelShoppingMall[index].content : ''}
                                                    onChange={(e) => handleShoppingMallInputChange(e, index, 'content')}
                                                    placeholder="후기를 입력해주세요"
                                                />
                                            </div>
                                        </div>}
                                    <div className="travelupdate-btn-div">
                                        {index >= 0 && travelShoppingMall[index].id && <button className='travelupdate-btn' type="button" onClick={() => updateShoppingMallContentField(travelShoppingMall[index], index)}>수정</button>}
                                        {index >= 0 && <button className='travelupdate-btn' type="button" onClick={() => removeShoppingMallContentField(index)}>삭제</button>}
                                    </div>
                                </div>
                            ))}
                            {travelTourList.map((content, index) => (
                                <div key={index}>
                                    {index === 0 && <hr></hr>}
                                    {travelTourList[index].location && index >= -1 &&
                                        <div className='travelupdate-card'>
                                            <h3>{travelTourList[index].tourList_title}</h3>
                                            <div className="travelupdate-img">
                                                <label className="travelupdate-img-btn">
                                                    <input
                                                        className="travelupdate-img-input"
                                                        type="file"
                                                        accept=".png, .jpeg, .jpg"
                                                        onChange={handleImgChange}
                                                    />
                                                </label>
                                            </div>
                                            <p>위치: {travelTourList[index].location}</p>
                                            <p>운영시간: {travelTourList[index].opentime} ~ {travelTourList[index].closetime}</p>
                                            <div className='travelupdate-div'>
                                                <label>가격: <input className="travelupdate-input" type="number" value={travelTourList[index].price} name="price" onChange={(e) => handleTourListInputChange(e, index, 'price')}></input></label>
                                            </div>
                                            <div className='travelupdate-div'>
                                                <textarea
                                                    className='travelupdate-textarea-input'
                                                    value={travelTourList[index].content ? travelTourList[index].content : ''}
                                                    onChange={(e) => handleTourListInputChange(e, index, 'content')}
                                                    placeholder="후기를 입력해주세요"
                                                />
                                            </div>
                                        </div>}
                                    <div className="travelupdate-btn-div">
                                        {index >= 0 && travelTourList[index].id && <button className='travelupdate-btn' type="button" onClick={() => updateTourListContentField(travelTourList[index], index)}>수정</button>}
                                        {index >= 0 && <button className='travelupdate-btn' type="button" onClick={() => removeTourListContentField(index)}>삭제</button>}
                                    </div>
                                </div>
                            ))}
                            {travelOtherService.map((content, index) => (
                                <div key={index}>
                                    {index === 0 && <hr></hr>}
                                    {travelOtherService[index].location && index >= -1 &&
                                        <div className='travelupdate-card'>
                                            <h3>{travelOtherService[index].otherService_title}</h3>
                                            <div className="travelupdate-img">
                                                <label className="travelupdate-img-btn">
                                                    <input
                                                        className="travelupdate-img-input"
                                                        type="file"
                                                        accept=".png, .jpeg, .jpg"
                                                        onChange={handleImgChange}
                                                    />
                                                </label>
                                            </div>
                                            <p>위치: {travelOtherService[index].location}</p>
                                            <p>운영시간: {travelOtherService[index].opentime} ~ {travelOtherService[index].closetime}</p>
                                            <div className='travelupdate-div'>
                                                <label>가격: <input className="travelupdate-input" type="number" value={travelOtherService[index].price} name="price" onChange={(e) => handleOtherServiceInputChange(e, index, 'price')}></input></label>
                                            </div>
                                            <div className='travelupdate-div'>
                                                <textarea
                                                    className='travelupdate-textarea-input'
                                                    value={travelOtherService[index].content ? travelOtherService[index].content : ''}
                                                    onChange={(e) => handleOtherServiceInputChange(e, index, 'content')}
                                                    placeholder="후기를 입력해주세요"
                                                />
                                            </div>
                                        </div>}
                                    <div className="travelupdate-btn-div">
                                        {index >= 0 && travelOtherService[index].id && <button className='travelupdate-btn' type="button" onClick={() => updateOtherServiceContentField(travelOtherService[index], index)}>수정</button>}
                                        {index >= 0 && <button className='travelupdate-btn' type="button" onClick={() => removeOtherServiceContentField(index)}>삭제</button>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='travelupdate-bottom'>
                        <button className="travelupdate-bottom-submit" type="submit" onClick={handleSubmit}>저장</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TravelUpdate;