import ContactRequest from "../contacts/ContactRequest";
import defaultProfile from '../../assets/images/profile-default.png';

const SearchProfileCard = ({ contactId, contactName , contactImage }) => {

    const profileImage = contactImage ? contactImage : defaultProfile;

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <img src={profileImage} alt="Profile" className="profile-picture" />
            <h4>{contactName}</h4>
            <ContactRequest contactId={contactId}/>
        </div>
    );
};

export default SearchProfileCard;