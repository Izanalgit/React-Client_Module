import { Link } from 'react-router-dom';

import ContactResponse from "./ContactResponse";
import ContactRemove from "./ContactRemove";
import BlockUser from "../privacy/BlockUser";

const ContactCard = ({ contactId, contactName, contactType }) => {

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h4>{contactName}</h4>
            {contactType === "request" 
                ? <ContactResponse contactId={contactId}/>
                : <ContactRemove contactId={contactId}/>
            }
            <BlockUser userId={contactId}/>
            <Link to={`/chat/${contactId}`}>Abrir chat</Link>
        </div>
    );
};

export default ContactCard;