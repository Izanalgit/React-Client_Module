import ContactResponse from "./ContactResponse";
import ContactRemove from "./ContactRemove";

const ContactCard = ({ contactId, contactName, contactType }) => {

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h4>{contactName}</h4>
            {contactType === "request" 
                ? <ContactResponse contactId={contactId}/>
                : <ContactRemove contactId={contactId}/>
            }
        </div>
    );
};

export default ContactCard;