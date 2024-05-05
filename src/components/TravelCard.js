import "./TravelCard.css";
import { useNavigate } from "react-router-dom";

const TravelCard = ({ id, title, description, imageUrl }) => {
    // const getTravel = async () => {
    //   const res = axios.get(`http://localhost:8080/api/v1/cafes/${id}`);
    //   console.log(res);
    // }

    const navigate = useNavigate();

    const getTravel = () => {
        // navigate(`/travel/${id}`);
    }

    return (
        <div className="travelcard-container">
            <div className="travelcard" onClick={getTravel}>
                <h5 className="travelcard-title">{title}</h5>
                <div className="travelcard-body">
                    <img src={imageUrl} alt={title} />
                    <p className="travelcard-text">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default TravelCard;