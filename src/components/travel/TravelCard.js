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



const TravelCard = ({ id, title, writer, star, image_url }) => {
    return (
        <div className="travelcard-container" key={id}>
            <div className="travelcard">

                <p>{id}</p>
                <h5 className="travelcard-title">{title}</h5>
                <div className="travelcard-body">
                    {imageUrl && <img src={imageUrl} alt='travel_image' />}
                    {/* <p>인원: {serving}</p> */}
                    <p>{star}</p>
                    {/* <p className="travelcard-text">{description}</p> */}

                {title ? (<h3 className="travelcard-title">{title}</h3>) : (<h3> </h3>)}
                <div className="travelcard-body" style={{ color: "black" }}>
                    {image_url && (
                        image_url.includes('.png') ?
                            <img src={image_url} alt='여행지 이미지' /> :
                            image_url.includes('.jpeg') ?
                                <img src={image_url} alt='여행지 이미지' /> :
                                image_url.includes('.jpg') &&
                                <img src={image_url} alt='여행지 이미지' />
                    )}
                    <p>{writer}</p>
                    <p>별점 {star}</p>

                </div>
            </div>
        </div>
        </div>
    )

};
}

export default TravelCard;