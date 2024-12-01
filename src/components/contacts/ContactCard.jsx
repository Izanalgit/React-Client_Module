import { Link } from 'react-router-dom';

import ContactResponse from "./ContactResponse";
import ContactRemove from "./ContactRemove";
import BlockUser from "../privacy/BlockUser";

import defaultProfile from '../../assets/images/profile-default.png';

const ContactCard = ({ contactId, contactImage, contactName, contactType ,countUnread}) => {

    const profileImage = contactImage ? contactImage : defaultProfile;

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <img src={profileImage} alt="Profile" className="profile-picture" />
            <h4>{contactName}</h4>
            {contactType === "request" 
                ? <ContactResponse contactId={contactId}/>
                : <ContactRemove contactId={contactId}/>
            }
            <BlockUser userId={contactId}/>
            {contactType === "contact" &&
                <>
                    {countUnread > 0 && <p>Mensajes sin leer {countUnread}</p>}
                    <Link to={`/chat/${contactName}/${contactId}`}>Abrir chat</Link>
                </>
            }
            
        </div>
    );
};

export default ContactCard;