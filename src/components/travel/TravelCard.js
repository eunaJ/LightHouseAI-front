import "./TravelCard.css";

const TravelCard = ({ id, title, writer, star, image_url }) => {
    return (
        <div className="travelcard-container" key={id}>
            <div className="travelcard">
                {title ? (<h3 className="travelcard-title">{title}</h3>) : (<h3> </h3>)}
                <div className="travelcard-body" style={{ color: "black" }}>
                    {image_url.includes(".png") && <img src={image_url} alt='여행지 이미지'></img>}
                    <p>{writer}</p>
                    <p>{star}</p>
                </div>
            </div>
        </div>
    );
};

export default TravelCard;