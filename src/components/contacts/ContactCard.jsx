import { useState } from 'react';
import { Link } from 'react-router-dom';

import ContactResponse from "./ContactResponse";
import ContactRemove from "./ContactRemove";
import BlockUser from "../privacy/BlockUser";

import '../../css/ContactCard.css';
import defaultProfile from '../../assets/images/profile-default.png';

const ContactCard = ({ contactId, contactImage, contactName, contactType ,countUnread}) => {
    
    const profileImage = contactImage ? contactImage : defaultProfile;

    const [contactButtons, setContactButtons] = useState(contactType === "request" ? true : false)

    const handleButtons = () => setContactButtons((prev)=>!prev);

    return (
        <div className="contact-card">
            <div className="contact-left">
                <img src={profileImage} alt="Profile" className="profile-picture" />
                <h4>{contactName}</h4>
            </div>

            {contactType === "contact" && countUnread?.count > 0 && (
                <p className="unread-count">M {countUnread?.count}</p>
            )}

            <div className="contact-right">
                {contactButtons ? (
                    <div className="contact-buttons">
                        {contactType === "request" ? (
                            <ContactResponse contactId={contactId} />
                        ) : (
                            <ContactRemove contactId={contactId} />
                        )}
                        <BlockUser userId={contactId} />
                    </div>
                ) : contactType === "contact" ? (
                    <div className="contact-links">
                        <Link to={`/chat/${contactName}/${contactId}`}>Abrir chat</Link>
                        <Link to={`/contact/${contactId}`}>Abrir Perfil</Link>
                    </div>
                ) : null}
            </div>

            {contactType !== "request" && (
                <p onClick={handleButtons} className="config-contact-but">-*-</p>
            )}
        </div>

    );
};

export default ContactCard;