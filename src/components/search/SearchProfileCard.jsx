import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../context/AppContext";

import ContactRequest from "../contacts/ContactRequest";
import defaultProfile from '../../assets/images/profile-default.png';

import '../../css/SearchCard.css';

const SearchProfileCard = ({ contactId, contactName, contactImage, contactBio}) => {

    const navigate = useNavigate();
    const {userContacts,userPremy} = useApp();

    const [ isContact , setIsContact ] = useState(false);
    
    const contacts = userContacts?.contactsList?.contacts
    const contact = contacts ? contacts.find((contact)=>contact.contactId == contactId) : null;

    const premyTime = userPremy?.premiumTime || 0;

    useEffect(()=>{
        if(contact)
            setIsContact(true);
    },[contact])

    const profileImage = contactImage ? contactImage : defaultProfile;

    return (
        <div className="search-card">
            {premyTime > 0 && !isContact &&
                <div className="premy-profile-view">
                <button 
                    onClick={()=>{navigate(`/contact/${contactId}`)}}    
                />
                </div>
            }
            <h4>{contactName}</h4>
            <img src={profileImage} alt="Profile" />
            <p>{contactBio}</p>
            {isContact 
                ? <button onClick={()=>{navigate(`/contact/${contactId}`)}}>Perfil</button>
                : <ContactRequest contactId={contactId}/>
            }
        </div>
    );
};

export default SearchProfileCard;