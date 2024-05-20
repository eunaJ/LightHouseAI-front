import "./TravelCard.css";

const TravelCard = ({ id, title, writer, star, image_url }) => {
    return (
        <div className="travelcard-container" key={id}>
            <div className="travelcard">
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
    );
};

export default TravelCard;