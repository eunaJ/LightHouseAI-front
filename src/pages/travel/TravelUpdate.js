import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import lighthouseaiLogo from '../../assets/img/lighthouseai_logo.png';
import axios from "axios";
import TravelModal from "./TravelModal";
import "./TravelUpdate.css";
import { render } from "@testing-library/react";
import TravelModalCard from "./TravelModalCard";
import TravelModalCardUpdate from "./TravelModalCardUpdate";
import api from "../../components/RefreshApi";
import TravelModalCafeUpdate from "./TravelModalCafeUpdate";
import TravelModalRestaurantUpdate from "./TravelModalRestaurantUpdate";

const TravelUpdate = (onCafeSpotAdd, onRestaurantSpotAdd, onShoppingMallSpotAdd, onTourListSpotAdd, onOtherServiceSpotAdd) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [travel, setTravel] = useState({});
    const [travelCafe, setTravelCafe] = useState([]);
    const [travelRestaurant, setTravelRestaurant] = useState([]);
    const [travelShoppingMall, setTravelShoppingMall] = useState([]);
    const [travelTourList, setTravelTourList] = useState([]);
    const [travelOtherService, setTravelOtherService] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalCafeIsOpen, setModalCafeIsOpen] = useState(false);
    const [modalRestaurantIsOpen, setModalRestaurantIsOpen] = useState(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [modalUpdateIndex, setModalUpdateIndex] = useState(0);
    const [selectedType, setSelectedType] = useState('');
    const [travelTitle, setTravelTitle] = useState('');
    const [travelWriter, setTravelWriter] = useState('');
    const [travelImgInit, setTravelImgInit] = useState('');
    const [travelImg, setTravelImg] = useState('');
    const [travelImgUrl, setTravelImgUrl] = useState('');
    const [isImgChange, setIsImgChange] = useState(false);
    const [cafeImgChange, setCafeImgChange] = useState(false);

    const [travelServing, setTravelServing] = useState(0);
    const [travelExpense, setTravelExpense] = useState(0);
    const [travelConstituency, setTravelConstituency] = useState('');
    const upload = useRef();

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
                    setTravelImg(res.data.image_url);
                    // const lastSlashIndex = res.data.image_url.lastIndexOf('/');
                    // const fileNameWithExtension = res.data.image_url.substring(lastSlashIndex + 1);
                    // console.log(lastSlashIndex);
                    // console.log(fileNameWithExtension);
                    // const extensionIndex = fileNameWithExtension.lastIndexOf('.');
                    // console.log(extensionIndex);
                    // if (extensionIndex !== -1) {
                    //     const fileName = fileNameWithExtension.substring(0, extensionIndex);
                    //     setTravelImg(fileName);
                    //     console.log(fileName);
                    // }
                    setTravelImgUrl(res.data.image_url);
                    setIsImgChange(false);
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
            console.log(e);
        }
    };

    const handleTravelImgChange = (e) => {
        if (upload.current && upload.current.files) {
            setIsImgChange(true);
            const img = upload.current.files[0];
            setTravelImg(img);
            //이미지 미리보기
            if (img) {
                const reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = () => {
                    setTravelImgUrl(reader.result);
                }
            }
            else {
                setTravelImgUrl(img);
            }
        }
    };

    const addTravelCafeField = () => {
        setTravelCafe([...travelCafe, {
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
        setTravelRestaurant([...travelRestaurant, {
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
        setTravelShoppingMall([...travelShoppingMall, {
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
        setTravelTourList([...travelTourList, {
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
        setTravelOtherService([...travelOtherService, {
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
        const newContents = [...travelCafe];
        newContents.splice(index, 1);
        console.log(travelCafe[index]);
        try {
            if (travelCafe[index].id) {
                const res = api.delete(`http://localhost:8080/api/v1/travelVisitorCafes/${travelCafe[index].id}`);
            }
        } catch (e) {
            console.error(e);
        }
        setTravelCafe(newContents);
    };
    const removeRestaurantContentField = (index) => {
        const newContents = [...travelRestaurant];
        newContents.splice(index, 1);
        console.log(travelRestaurant[index]);
        try {
            if (travelRestaurant[index].id) {
                const res = api.delete(`http://localhost:8080/api/v1/travelVisitorRestaurants/${travelRestaurant[index].id}`);
            }
        } catch (e) {
            console.error(e);
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
        }
        setTravelOtherService(newContents);
    };

    //     const search = cafeList.filter((item) =>
    //         item.title === searchText
    // );

    const updateCafeContentField = (index) => {
        setSelectedType('카페');
        setModalUpdateIndex(index);
        setModalCafeIsOpen(true);
    }
    const updateRestaurantContentField = (index) => {
        setSelectedType('음식점');
        setModalUpdateIndex(index);
        setModalRestaurantIsOpen(true);
    }
    const updateShoppingMallContentField = (index) => {
        setSelectedType('쇼핑몰');
        setModalUpdateIndex(index);
        setModalUpdateIsOpen(true);
    }
    const updateTourListContentField = (index) => {
        setSelectedType('관광지');
        setModalUpdateIndex(index);
        setModalUpdateIsOpen(true);
    }
    const updateOtherServiceContentField = (index) => {
        setSelectedType('기타서비스');
        setModalUpdateIndex(index);
        setModalUpdateIsOpen(true);
    }

    const handleCafeSpotUpdate = (updatedSpot, spotImg, spotImgUrl, imageChange, content, index) => {
        const updatedContents = [...travelCafe];
        updatedContents[index] = {
            ...updatedContents[index - 1],
            id: updatedSpot.id,
            type: updatedSpot.type,
            menu: updatedSpot.menu,
            price: updatedSpot.price,
            opentime: updatedSpot.opentime,
            closetime: updatedSpot.closetime,
            location: updatedSpot.location,
            cafe_title: updatedSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            content: content,
            imageChange: imageChange
        }
        setTravelCafe(updatedContents);
    };
    const handleRestaurantSpotUpdate = (updatedSpot, spotImg, spotImgUrl, content, index) => {
        const updatedContents = [...travelRestaurant];
        updatedContents[index] = {
            ...updatedContents[index - 1],
            id: updatedSpot.id,
            type: updatedSpot.type,
            menu: updatedSpot.menu,
            price: updatedSpot.price,
            opentime: updatedSpot.opentime,
            closetime: updatedSpot.closetime,
            location: updatedSpot.location,
            restaurant_title: updatedSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            content: content
        }
        setTravelRestaurant(updatedContents);
    };
    const handleShoppingMallSpotUpdate = (updatedSpot, spotImg, spotImgUrl, content, index) => {
        const updatedContents = [...travelShoppingMall];
        updatedContents[index] = {
            ...updatedContents[index - 1],
            id: updatedSpot.id,
            type: updatedSpot.type,
            price: updatedSpot.price,
            opentime: updatedSpot.opentime,
            closetime: updatedSpot.closetime,
            location: updatedSpot.location,
            shoppingMall_title: updatedSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            content: content
        }
        setTravelShoppingMall(updatedContents);
    };
    const handleTourListSpotUpdate = (updatedSpot, spotImg, spotImgUrl, content, index) => {
        const updatedContents = [...travelTourList];
        updatedContents[index] = {
            ...updatedContents[index - 1],
            id: updatedSpot.id,
            type: updatedSpot.type,
            price: updatedSpot.price,
            opentime: updatedSpot.opentime,
            closetime: updatedSpot.closetime,
            location: updatedSpot.location,
            tourList_title: updatedSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            content: content
        }
        setTravelTourList(updatedContents);
    };
    const handleOtherServiceSpotUpdate = (updatedSpot, spotImg, spotImgUrl, content, index) => {
        const updatedContents = [...travelOtherService];
        updatedContents[index] = {
            ...updatedContents[index - 1],
            id: updatedSpot.id,
            type: updatedSpot.type,
            price: updatedSpot.price,
            opentime: updatedSpot.opentime,
            closetime: updatedSpot.closetime,
            location: updatedSpot.location,
            otherService_title: updatedSpot.title,
            image_url: spotImg,
            spotImgUrl: spotImgUrl,
            content: content
        }
        setTravelOtherService(updatedContents);
    };

    const handleCafeSpotAdd = (newSpot, spotImg, spotImgUrl, content, index) => {
        const newContents = [...travelCafe];
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
        setTravelCafe(newContents);
    };
    const handleRestaurantSpotAdd = (newSpot, spotImg, spotImgUrl, content, index) => {
        const newContents = [...travelRestaurant];
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
        setTravelRestaurant(newContents);
    };
    const handleShoppingMallSpotAdd = (newSpot, spotImg, spotImgUrl, content, index) => {
        const newContents = [...travelShoppingMall];
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
        setTravelShoppingMall(newContents);
    };
    const handleTourListSpotAdd = (newSpot, spotImg, spotImgUrl, content, index) => {
        const newContents = [...travelTourList];
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
        setTravelTourList(newContents);
    };
    const handleOtherServiceSpotAdd = (newSpot, spotImg, spotImgUrl, content, index) => {
        const newContents = [...travelOtherService];
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
        setTravelOtherService(newContents);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const travelData = {
                "title": travelTitle,
                "serving": travelServing,
                "constituency": travelConstituency,
                "star": starCount,
                'imageChange': isImgChange
            };
            const formData = new FormData();
            formData.append("controllerRequestDto", new Blob([JSON.stringify(travelData)], { type: 'application/json' }));
            if (isImgChange) {
                if (travelImg) {
                    formData.append("multipartFile", travelImg);
                } else {
                    formData.append('multipartFile', new Blob(), '');
                }
            }

            
            const updateTravelCafe = async (travelCafe) => {
                for (let i = 0; i < travelCafe.length; i++) {
                    const formCafe = new FormData();
                    const cafe = travelCafe[i];
                    console.log(cafe);
                    formCafe.append("controllerRequestDto", new Blob([JSON.stringify(cafe)], { type: 'application/json' }));
                    if (cafe.imageChange) {
                        if (cafe.image_url) {
                            formCafe.append("multipartFile", cafe.image_url);
                        } else {
                            formCafe.append('multipartFile', new Blob(), '');
                        }
                    }
                    if (cafe.id === undefined) {
                        const res = await api.post(`http://localhost:8080/api/v1/travelVisitorCafes/create/${travelId}`, formCafe, {
                            headers: {
                                "Content-Type": "multipart/form-data;",
                                'Authorization': localStorage.getItem('accessToken')
                            },
                        });
                    }
                    else {
                        try {
                            const res = await api.put(`http://localhost:8080/api/v1/travelVisitorCafes/${cafe.id}`, formCafe, {
                                headers: {
                                    "Content-Type": "multipart/form-data;",
                                    'Authorization': localStorage.getItem('accessToken')
                                },
                            });
                        } catch (e) {
                            console.error('카페 업데이트 오류: ' + e);
                        }
                    }
                }
            }
            await updateTravelCafe(travelCafe);

            // const formRestaurant = new FormData();
            // const updateTravelRestaurant = async (travelRestaurant) => {
            //     for (let i = 0; i < travelRestaurant.length; i++) {
            //         const content = travelRestaurant[i];
            //         if (content.id === undefined) {
            //             formRestaurant.append("controllerRequestDto", new Blob([JSON.stringify(content)], { type: 'application/json' }));
            //             if (formRestaurant.get('multipartFile') === null) {
            //                 formRestaurant.append('multipartFile', new Blob(), '');
            //             }
            //             const res = await api.post(`http://localhost:8080/api/v1/travelVisitorRestaurants/create/${travelId}`, formRestaurant, {
            //                 headers: {
            //                     "Content-Type": "multipart/form-data;",
            //                     'Authorization': localStorage.getItem('accessToken')
            //                 },
            //             });
            //         }
            //         else {
            //             try {
            //                 const res = await api.put(`http://localhost:8080/api/v1/travelVisitorRestaurants/${content.id}`, content, {
            //                     headers: {
            //                         // "Content-Type": "multipart/form-data;",
            //                         'Authorization': localStorage.getItem('accessToken')
            //                     },
            //                 });
            //             } catch (e) {
            //                 console.error('음식점 업데이트 오류: ' + e);
            //             }
            //         }
            //     }
            // }
            // await updateTravelRestaurant(travelRestaurant);

            // const formShoppingMall = new FormData();
            // const updateTravelShoppingMall = async (travelShoppingMall) => {
            //     for (let i = 0; i < travelShoppingMall.length; i++) {
            //         const content = travelShoppingMall[i];
            //         if (content.id === undefined) {
            //             formShoppingMall.append("controllerRequestDto", new Blob([JSON.stringify(content)], { type: 'application/json' }));
            //             if (formShoppingMall.get('multipartFile') === null) {
            //                 formShoppingMall.append('multipartFile', new Blob(), '');
            //             }
            //             const res = await api.post(`http://localhost:8080/api/v1/travelVisitorShoppingMalls/create/${travelId}`, formShoppingMall, {
            //                 headers: {
            //                     "Content-Type": "multipart/form-data;",
            //                     'Authorization': localStorage.getItem('accessToken')
            //                 },
            //             });
            //         }
            //         else {
            //             try {
            //                 const res = await api.put(`http://localhost:8080/api/v1/travelVisitorShoppingMalls/${content.id}`, content, {
            //                     headers: {
            //                         // "Content-Type": "multipart/form-data;",
            //                         'Authorization': localStorage.getItem('accessToken')
            //                     },
            //                 });
            //             } catch (e) {
            //                 console.error('쇼핑몰 업데이트 오류: ' + e);
            //             }
            //         }
            //     }
            // }
            // updateTravelShoppingMall(travelShoppingMall);

            // const formTourList = new FormData();
            // const updateTravelTourList = async (travelTourList) => {
            //     for (let i = 0; i < travelTourList.length; i++) {
            //         const content = travelTourList[i];
            //         if (content.id === undefined) {
            //             formTourList.append("controllerRequestDto", new Blob([JSON.stringify(content)], { type: 'application/json' }));
            //             if (formTourList.get('multipartFile') === null) {
            //                 formTourList.append('multipartFile', new Blob(), '');
            //             }
            //             const res = await api.post(`http://localhost:8080/api/v1/travelVisitorTourLists/create/${travelId}`, formTourList, {
            //                 headers: {
            //                     "Content-Type": "multipart/form-data;",
            //                     'Authorization': localStorage.getItem('accessToken')
            //                 },
            //             });
            //         }
            //         else {
            //             try {
            //                 const res = await api.put(`http://localhost:8080/api/v1/travelVisitorTourLists/${content.id}`, content, {
            //                     headers: {
            //                         // "Content-Type": "multipart/form-data;",
            //                         'Authorization': localStorage.getItem('accessToken')
            //                     },
            //                 });
            //             } catch (e) {
            //                 console.error('관광지 업데이트 오류: ' + e);
            //             }
            //         }
            //     }
            // }
            // updateTravelTourList(travelTourList);

            // const formOtherService = new FormData();
            // const updateTravelOtherService = async (travelOtherService) => {
            //     for (let i = 0; i < travelOtherService.length; i++) {
            //         const content = travelOtherService[i];
            //         if (content.id === undefined) {
            //             formOtherService.append("controllerRequestDto", new Blob([JSON.stringify(content)], { type: 'application/json' }));
            //             if (formOtherService.get('multipartFile') === null) {
            //                 formOtherService.append('multipartFile', new Blob(), '');
            //             }
            //             const res = await api.post(`http://localhost:8080/api/v1/travelVisitorOtherServices/create/${travelId}`, formOtherService, {
            //                 headers: {
            //                     "Content-Type": "multipart/form-data;",
            //                     'Authorization': localStorage.getItem('accessToken')
            //                 },
            //             });
            //         }
            //         else {
            //             try {
            //                 const res = await api.put(`http://localhost:8080/api/v1/travelVisitorOtherServices/${content.id}`, content, {
            //                     headers: {
            //                         // "Content-Type": "multipart/form-data;",
            //                         'Authorization': localStorage.getItem('accessToken')
            //                     },
            //                 });
            //             } catch (e) {
            //                 console.error('기타서비스 업데이트 오류: ' + e);
            //             }
            //         }
            //     }
            // }
            // updateTravelOtherService(travelOtherService);



            console.log(...formData);
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
                            <div className='travelupdate-img-pcontent'>
                                {travelImgUrl && (
                                    <img src={travelImgUrl} alt="여행지 사진" width={'30%'} />
                                )}
                            </div>
                            <div className='travelupdate-img'>
                                <label className="travelupdate-img-btn">
                                    <input
                                        className="travelupdate-img-input"
                                        type="file"
                                        accept=".png, .jpeg, .jpg"
                                        ref={upload}
                                        onChange={handleTravelImgChange}
                                    />
                                </label>
                            </div>

                            <div className='travelupdate-serving'>
                                <label>인원<input className="travelupdate-serving-input" type="number" name="serving" value={travelServing} onChange={(e) => setTravelServing(e.target.value)}></input></label>
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
                            <hr />
                            {travelCafe.map((content, index) => (
                                <div key={index}>
                                    <TravelModal type={selectedType} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onCafeSpotAdd={handleCafeSpotAdd} index={index}></TravelModal>
                                    <TravelModalCafeUpdate type={selectedType} isCafeOpen={modalCafeIsOpen} onCafeClose={() => setModalCafeIsOpen(false)} travel={travelCafe[modalUpdateIndex]} title={travelCafe[modalUpdateIndex].cafe_title} index={modalUpdateIndex} onCafeSpotToModal={handleCafeSpotUpdate}></TravelModalCafeUpdate>
                                    {index !== 0 && <hr></hr>}
                                    {travelCafe[index].location && index >= -1 &&
                                        <div className='travelupdate-card'>
                                            <h3>{travelCafe[index].cafe_title}</h3>
                                            {!travelCafe[index].spotImgUrl ? (
                                                travelCafe[index].image_url && (
                                                    <img src={travelCafe[index].image_url} alt="여행지 사진" width={'30%'} />
                                                )
                                            ) : (
                                                <img src={travelCafe[index].spotImgUrl} alt="여행지 사진" width={'30%'} />
                                            )}

                                            <p>위치: {travelCafe[index].location}</p>
                                            <p>메뉴: {travelCafe[index].menu}</p>
                                            <p>가격: {travelCafe[index].price}</p>
                                            <p>운영시간: {travelCafe[index].opentime} ~ {travelCafe[index].closetime}</p>
                                            <p>{travelCafe[index].content}</p>
                                        </div>}
                                    {index >= 0 && travelCafe[index].id && <button className='travelupdate-main-delbtn' type="button" onClick={() => updateCafeContentField(index)}>수정</button>}
                                    {index >= 0 && <button className='travelupdate-main-delbtn' type="button" onClick={() => removeCafeContentField(index)}>삭제</button>}
                                </div>
                            ))}
                            <button className='travelupdate-main-addbtn' type="button" onClick={addTravelCafeField}>카페 추가</button>

                            {/* {travelRestaurant.map((content, index) => (
                                <div key={index}>
                                    <TravelModal type={selectedType} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onRestaurantSpotAdd={handleRestaurantSpotAdd} index={index}></TravelModal>
                                    <TravelModalRestaurantUpdate type={selectedType} isRestaurantOpen={modalRestaurantIsOpen} onRestaurantClose={() => setModalRestaurantIsOpen(false)} travel={travelRestaurant[modalUpdateIndex]} title={travelRestaurant[modalUpdateIndex].restaurant_title} index={modalUpdateIndex} onRestaurantSpotToModal={handleRestaurantSpotUpdate}></TravelModalRestaurantUpdate>
                                    {index === 0 && <hr></hr>}
                                    {travelRestaurant[index].location && index >= -1 &&
                                        <div className='travelupdate-card'>
                                            <h3>{travelRestaurant[index].restaurant_title}</h3>
                                            {travelRestaurant[index].spotImgUrl && (travelRestaurant[index].spotImgUrl.includes(".png") || travelRestaurant[index].spotImgUrl.includes(".jpeg") || travelRestaurant[index].spotImgUrl.includes(".jpg")) ? (
                                                <img src={travelRestaurant[index].spotImgUrl} alt="Spot Image" className='travelupdate-card-img' />
                                            ) : (travelRestaurant[index].image_url && (travelRestaurant[index].image_url.includes(".png") || travelRestaurant[index].image_url.includes(".jpeg") || travelRestaurant[index].image_url.includes(".jpg")) ? (
                                                <img src={travelRestaurant[index].image_url} alt="Default Image" className='travelupdate-card-img' />
                                            ) : null)}
                                            <p>위치: {travelRestaurant[index].location}</p>
                                            <p>메뉴: {travelRestaurant[index].menu}</p>
                                            <p>가격: {travelRestaurant[index].price}</p>
                                            <p>운영시간: {travelRestaurant[index].opentime} ~ {travelRestaurant[index].closetime}</p>
                                            <p>{travelRestaurant[index].content}</p>
                                        </div>
                                    }
                                    {index >= 0 && <button className='travelupdate-main-delbtn' type="button" onClick={() => updateRestaurantContentField(index)}>수정</button>}
                                    {index >= 0 && <button className='travelupdate-main-delbtn' type="button" onClick={() => removeRestaurantContentField(index)}>삭제</button>}
                                    <p></p>
                                </div>
                            ))}
                            <button className='travelupdate-main-addbtn' type="button" onClick={addTravelRestaurantField}>음식점 추가</button>
                            <hr /> */}
                            {/* {travelShoppingMall.map((content, index) => (
                                <div key={index}>
                                    <TravelModal type={selectedType} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onShoppingMallSpotAdd={handleShoppingMallSpotAdd} index={index}></TravelModal>
                                    <TravelModalCardUpdate type={selectedType} isUOpen={modalUpdateIsOpen} onUClose={() => setModalUpdateIsOpen(false)} travel={travelShoppingMall[modalUpdateIndex]} title={travelShoppingMall[modalUpdateIndex].shoppingMall_title} index={modalUpdateIndex} onShoppingMallSpotToModal={handleShoppingMallSpotUpdate}></TravelModalCardUpdate>
                                    {index === 0 && <hr></hr>}
                                    {travelShoppingMall[index].location && index >= -1 &&
                                        <div className='travelupdate-card'>
                                            <h3>{travelShoppingMall[index].shoppingMall_title}</h3>
                                            {travelShoppingMall[index].spotImgUrl && (travelShoppingMall[index].spotImgUrl.includes(".png") || travelShoppingMall[index].spotImgUrl.includes(".jpeg") || travelShoppingMall[index].spotImgUrl.includes(".jpg")) ? (
                                                <img src={travelShoppingMall[index].spotImgUrl} alt="Spot Image" className='travelupdate-card-img' />
                                            ) : (travelShoppingMall[index].image_url && (travelShoppingMall[index].image_url.includes(".png") || travelShoppingMall[index].image_url.includes(".jpeg") || travelShoppingMall[index].image_url.includes(".jpg")) ? (
                                                <img src={travelShoppingMall[index].image_url} alt="Default Image" className='travelupdate-card-img' />
                                            ) : null)}
                                            <p>위치: {travelShoppingMall[index].location}</p>
                                            <p>가격: {travelShoppingMall[index].price}</p>
                                            <p>운영시간: {travelShoppingMall[index].opentime} ~ {travelShoppingMall[index].closetime}</p>
                                            <p>{travelShoppingMall[index].content}</p>
                                        </div>
                                    }
                                    {index >= 0 && <button className='travelupdate-main-delbtn' type="button" onClick={() => updateShoppingMallContentField(index)}>수정</button>}
                                    {index >= 0 && <button className='travelupdate-main-delbtn' type="button" onClick={() => removeShoppingMallContentField(index)}>삭제</button>}
                                    <p></p>
                                </div>
                            ))}
                            <button className='travelupdate-main-addbtn' type="button" onClick={addTravelShoppingMallField}>쇼핑몰 추가</button>
                            {travelTourList.map((content, index) => (
                                <div key={index}>
                                    <TravelModal type={selectedType} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onTourListSpotAdd={handleTourListSpotAdd} index={index}></TravelModal>
                                    <TravelModalCardUpdate type={selectedType} isUOpen={modalUpdateIsOpen} onUClose={() => setModalUpdateIsOpen(false)} travel={travelTourList[modalUpdateIndex]} title={travelTourList[modalUpdateIndex].tourList_title} index={modalUpdateIndex} onTourListSpotToModal={handleTourListSpotUpdate}></TravelModalCardUpdate>
                                    {index === 0 && <hr></hr>}
                                    {travelTourList[index].location && index >= -1 &&
                                        <div className='travelupdate-card'>
                                            <h3>{travelTourList[index].tourList_title}</h3>
                                            {travelTourList[index].spotImgUrl && (travelTourList[index].spotImgUrl.includes(".png") || travelTourList[index].spotImgUrl.includes(".jpeg") || travelTourList[index].spotImgUrl.includes(".jpg")) ? (
                                                <img src={travelTourList[index].spotImgUrl} alt="Spot Image" className='travelupdate-card-img' />
                                            ) : (travelTourList[index].image_url && (travelTourList[index].image_url.includes(".png") || travelTourList[index].image_url.includes(".jpeg") || travelTourList[index].image_url.includes(".jpg")) ? (
                                                <img src={travelTourList[index].image_url} alt="Default Image" className='travelupdate-card-img' />
                                            ) : null)}
                                            <p>위치: {travelTourList[index].location}</p>
                                            <p>가격: {travelTourList[index].price}</p>
                                            <p>운영시간: {travelTourList[index].opentime} ~ {travelTourList[index].closetime}</p>
                                            <p>{travelTourList[index].content}</p>
                                        </div>}
                                    {index >= 0 && <button className='travelupdate-main-delbtn' type="button" onClick={() => updateTourListContentField(index)}>수정</button>}
                                    {index >= 0 && <button className='travelupdate-main-delbtn' type="button" onClick={() => removeTourListContentField(index)}>삭제</button>}
                                    <p></p>
                                </div>
                            ))}
                            <button className='travelupdate-main-addbtn' type="button" onClick={addTravelTourListField}>관광지 추가</button>
                            {travelOtherService.map((content, index) => (
                                <div key={index}>
                                    <TravelModal type={selectedType} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onOtherServiceSpotAdd={handleOtherServiceSpotAdd} index={index}></TravelModal>
                                    <TravelModalCardUpdate type={selectedType} isUOpen={modalUpdateIsOpen} onUClose={() => setModalUpdateIsOpen(false)} travel={travelOtherService[modalUpdateIndex]} title={travelOtherService[modalUpdateIndex].otherService_title} index={modalUpdateIndex} onOtherServiceSpotToModal={handleOtherServiceSpotUpdate}></TravelModalCardUpdate>
                                    {index === 0 && <hr></hr>}
                                    {travelOtherService[index].location && index >= -1 &&
                                        <div className='travelupdate-card'>
                                            <h3>{travelOtherService[index].otherService_title}</h3>
                                    {travelOtherService[index].spotImgUrl && (travelOtherService[index].spotImgUrl.includes(".png") || travelOtherService[index].spotImgUrl.includes(".jpeg") || travelOtherService[index].spotImgUrl.includes(".jpg")) ? (
                                    <img src={travelOtherService[index].spotImgUrl} alt="Spot Image" className='travelupdate-card-img' />
                                ) : (travelOtherService[index].image_url && (travelOtherService[index].image_url.includes(".png") || travelOtherService[index].image_url.includes(".jpeg") || travelOtherService[index].image_url.includes(".jpg")) ? (
                                    <img src={travelOtherService[index].image_url} alt="Default Image" className='travelupdate-card-img' />
                                ) : null)}
                                            <p>위치: {travelOtherService[index].location}</p>
                                            <p>가격: {travelOtherService[index].price}</p>
                                            <p>운영시간: {travelOtherService[index].opentime} ~ {travelOtherService[index].closetime}</p>
                                            <p>{travelOtherService[index].content}</p>
                                        </div>
                                    }
                                    {index >= 0 && <button className='travelupdate-main-delbtn' type="button" onClick={() => updateOtherServiceContentField(index)}>수정</button>}
                                    {index >= 0 && <button className='travelupdate-main-delbtn' type="button" onClick={() => removeOtherServiceContentField(index)}>삭제</button>}
                                    <p></p>
                                </div>
                            ))} */}
                            {/* <button className='travelupdate-main-addbtn' type="button" onClick={addTravelOtherServiceField}>기타서비스 추가</button> */}
                        </div>
                    </div>
                </div>
            )}

            <div className='travelregi-bottom'>
                <button className="travelregi-bottom-submit" type="submit" onClick={handleSubmit}>저장</button>
            </div>
        </div>
    );
};

export default TravelUpdate;