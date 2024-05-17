import "./TravelCard.css";
import { useNavigate } from "react-router-dom";

const TravelCard = ({ id, title, serving, star, imageUrl }) => {
    // const getTravel = async () => {
    //   const res = axios.get(`http://localhost:8080/api/v1/cafes/${id}`);
    //   console.log(res);
    // }

    const navigate = useNavigate();

    const getTravel = () => {
        // navigate(`/travel/${id}`);
    }

    return (
        <div className="travelcard-container" key={id}>
            <div className="travelcard">
                <p>{id}</p>
                <h5 className="travelcard-title">{title}</h5>
                <div className="travelcard-body">
                    {imageUrl && <img src={imageUrl} alt='travel_image' />}
                    {/* <p>인원: {serving}</p> */}
                    <p>별점: {star}</p>
                    {/* <p className="travelcard-text">{description}</p> */}
                </div>
            </div>
        </div>
    );
};

export default TravelCard;