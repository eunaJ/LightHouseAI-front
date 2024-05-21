import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Travel from "../../components/travel/Travel";
import "./TravelDetail.css";
import lighthouseaiLogo from '../../assets/img/lighthouseai_logo.png';
import api from "../../components/RefreshApi";

const TravelDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [travel, setTravel] = useState({});
  const [travelCafe, setTravelCafe] = useState([]);
  const [travelRestaurant, setTravelRestaurant] = useState([]);
  const [travelShoppingMall, setTravelShoppingMall] = useState([]);
  const [travelTourList, setTravelTourList] = useState([]);
  const [travelOtherService, setTravelOtherService] = useState([]);

  const navigate = useNavigate();
  const gotoHome = () => {
    navigate('/');
  }

  const getTravel = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/travels/${id}`);
      setTravel(res.data);
      const visitorId = res.data.id;
      const isLogin = !!localStorage.getItem("accessToken");
      if (isLogin) {
        const w = await api.get('/users/user');
        if (w.data.nickname === res.data.writer) {
          setIsWriter(true);
        }
      }

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
    }
  };

  const gotoUpdate = () => {
    navigate('/travel/update/' + id);
  };

  const deleteTravel = async () => {
    if (window.confirm('여행지를 삭제하시겠습니까?')) {
      try {
        const res = await api.delete(`http://localhost:8080/api/v1/travels/${id}`);
        if (res.status === 200) {
          alert('삭제되었습니다!');
        }
        navigate('/');
      } catch (e) {
        alert('삭제하지 못했습니다.');
      }
    }
  };

  const [isWriter, setIsWriter] = useState(false);

  useEffect(() => {
    getTravel();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <div className="traveldetail">
          <div className='traveldetail-top'>
            <div className='traveldetail-logo'>
              <img src={lighthouseaiLogo} alt="로고" height={"100px"} id='lighthouseaiLogo' onClick={gotoHome}></img>
            </div>
          </div>
          <div className="traveldetail-inner">
            <div className="traveldetail-inner-main">
              <Travel
                id={travel.id}
                writer={travel.writer}
                title={travel.title}
                image_url={travel.image_url}
                expense={travel.travel_expense}
                serving={travel.serving}
                star={travel.star}
              />
              {travelCafe.map((content, index) => (
                <div key={index}>
                  {index === 0 && <hr></hr>}
                  {travelCafe[index].location && index >= -1 &&
                    <div className='traveldetail-card'>
                      <h3>{travelCafe[index].cafe_title}</h3>
                      {travelCafe[index].image_url && (
                        <img src={travelCafe[index].image_url} alt="Spot Image" className='traveldetail-card-img' />
                      )}
                      <p>위치: {travelCafe[index].location}</p>
                      <p>메뉴: {travelCafe[index].menu}</p>
                      <p>가격: {travelCafe[index].price}</p>
                      <p>운영시간: {travelCafe[index].opentime} ~ {travelCafe[index].closetime}</p>
                      <p>{travelCafe[index].content}</p>
                    </div>}
                  <p></p>
                </div>
              ))}
              {travelRestaurant.map((content, index) => (
                <div key={index}>
                  {index === 0 && <hr></hr>}
                  {travelRestaurant[index].location && index >= -1 &&
                    <div className='traveldetail-card'>
                      <h3>{travelRestaurant[index].restaurant_title}</h3>
                      {travelRestaurant[index].image_url && (
                        <img src={travelRestaurant[index].image_url} alt="Spot Image" className='traveldetail-card-img' />
                      )}
                      <p>위치: {travelRestaurant[index].location}</p>
                      <p>메뉴: {travelRestaurant[index].menu}</p>
                      <p>가격: {travelRestaurant[index].price}</p>
                      <p>운영시간: {travelRestaurant[index].opentime} ~ {travelRestaurant[index].closetime}</p>
                      <p>{travelRestaurant[index].content}</p>
                    </div>
                  }
                  <p></p>
                </div>
              ))}
              {travelShoppingMall.map((content, index) => (
                <div key={index}>
                  {index === 0 && <hr></hr>}
                  {travelShoppingMall[index].location && index >= -1 &&
                    <div className='traveldetail-card'>
                      <h3>{travelShoppingMall[index].shoppingMall_title}</h3>
                      {travelShoppingMall[index].image_url && (
                        <img src={travelShoppingMall[index].image_url} alt="Spot Image" className='traveldetail-card-img' />
                      )}
                      <p>위치: {travelShoppingMall[index].location}</p>
                      <p>가격: {travelShoppingMall[index].price}</p>
                      <p>운영시간: {travelShoppingMall[index].opentime} ~ {travelShoppingMall[index].closetime}</p>
                      <p>{travelShoppingMall[index].content}</p>
                    </div>
                  }
                  <p></p>
                </div>
              ))}
              {travelTourList.map((content, index) => (
                <div key={index}>
                  {index === 0 && <hr></hr>}
                  {travelTourList[index].location && index >= -1 &&
                    <div className='traveldetail-card'>
                      <h3>{travelTourList[index].tourList_title}</h3>
                      {travelTourList[index].image_url && (
                        <img src={travelTourList[index].image_url} alt="Spot Image" className='traveldetail-card-img' />
                      )}
                      <p>위치: {travelTourList[index].location}</p>
                      <p>가격: {travelTourList[index].price}</p>
                      <p>운영시간: {travelTourList[index].opentime} ~ {travelTourList[index].closetime}</p>
                      <p>{travelTourList[index].content}</p>
                    </div>}
                  <p></p>
                </div>
              ))}
              {travelOtherService.map((content, index) => (
                <div key={index}>
                  {index === 0 && <hr></hr>}
                  {travelOtherService[index].location && index >= -1 &&
                    <div className='traveldetail-card'>
                      <h3>{travelOtherService[index].otherService_title}</h3>
                      {travelOtherService[index].image_url && (
                        <img src={travelOtherService[index].image_url} alt="Spot Image" className='traveldetail-card-img' />
                      )}
                      <p>위치: {travelOtherService[index].location}</p>
                      <p>가격: {travelOtherService[index].price}</p>
                      <p>운영시간: {travelOtherService[index].opentime} ~ {travelOtherService[index].closetime}</p>
                      <p>{travelOtherService[index].content}</p>
                    </div>
                  }
                  <p></p>
                </div>
              ))}
            </div>
            <div className="traveldetail-btn">
              {isWriter && <button onClick={gotoUpdate}>수정</button>}
              {isWriter && <button onClick={deleteTravel}>삭제</button>}
              <button onClick={gotoHome}>목록</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelDetail;