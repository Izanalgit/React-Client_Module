import ContactRequest from "../contacts/ContactRequest";
import defaultProfile from '../../assets/images/profile-default.png';

import '../../css/SearchCard.css';

const SearchProfileCard = ({ contactId, contactName, contactImage, contactBio}) => {

    const profileImage = contactImage ? contactImage : defaultProfile;

    return (
        <div className="search-card">
            <h4>{contactName}</h4>
            <img src={profileImage} alt="Profile" />
            <p>{contactBio}</p>
            <ContactRequest contactId={contactId}/>
        </div>
    );
};

export default SearchProfileCard;