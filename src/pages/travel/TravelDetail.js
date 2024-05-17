import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Travel from "../../components/travel/Travel";


const TravelDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [travel, setTravel] = useState({});

  const getTravel = async () => {
    const res = await axios.get(`http://localhost:8080/api/v1/travelVisitorCafes/${id}`);
    setTravel(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getTravel();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Travel
          id={travel.id}
          title={travel.cafe_title}
          expense={travel.expense}
          serving={travel.serving}
          star={travel.star}
        />
      )}
    </div>
  );
};

export default TravelDetail;