import "./TravelCard.css";
import lighthouseaiLogo from '../../assets/img/lighthouseai_logo.png';

const TravelCard = ({ id, title, expense, star, image_url }) => {
    return (
        <div className="travelcard-container" key={id}>
            <div className="travelcard">
                <div className="travelcard-img" style={{ height: "50%" }}>
                    {image_url && ['.png', '.jpeg', '.jpg'].some(ext => image_url.includes(ext)) ? (
                        <img src={image_url} alt="여행지 이미지" style={{ width: "100%", maxHeight: "100%" }} />
                    ) : (
                        <img src={lighthouseaiLogo} alt="기본 이미지" style={{ width: "100%", maxHeight: "100%" }} />
                    )}
                </div>
                <hr style={{ color: "black", height: "0.1px", marginTop: "0.1px" }} />
                {title ? (<h3 className="travelcard-title" style={{ marginBottom: "0" }}>{title}</h3>) : (<h3> </h3>)}
                {star !== 0 && (
                    <p style={{ margin: "0", marginLeft: "5px" }}>
                        {[...Array(star)].map((_, index) => (
                            <span key={index}>★</span>
                        ))}
                    </p>
                )}
                {expense !== 0 ? <p style={{ margin: "5px", marginLeft: "5px" }}>여행 경비 {expense}원</p> : null}
            </div>
        </div>
    )

};


export default TravelCard;