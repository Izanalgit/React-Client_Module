import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useChatContext } from "../../context/ChatContext";

import ContactCard from "./ContactCard";

const ContactList = () => {

    const [onRequests, setOnRequests] = useState(false);

    const {userContacts} = useApp();
    const {unRead} = useChatContext();

    const contacts = userContacts?.contactsList?.contacts || [];
    const requests = userContacts?.contactsList?.requests || [];

    const changeContactsList = (onReq) => setOnRequests(onReq);

    return (
        <div className="contacts-list">
            <div className="title-selector">
                <h3 
                    className={!onRequests ? "active" : ""} 
                    onClick={() => changeContactsList(false)}
                >
                    Contactos
                </h3>
                <h3>|</h3>
                <h3 
                    className={onRequests ? "active" : ""} 
                    onClick={() => changeContactsList(true)}
                >
                    Solicitudes
                </h3>
            </div>
            {onRequests
                ?<>{requests.length > 0 ? (
                    requests.map((request) => (
                        <ContactCard 
                            key={request.contactId} 
                            contactId={request.contactId}
                            contactImage={request.profilePicture}  
                            contactName={request.contactName}
                            contactType="request" 
                        />
                    ))
                ) : (
                    <p>No tienes solicitudes pendientes.</p>
                )}</>
                :<>{contacts.length > 0 ? (
                    contacts.map((contact) => {
                        const unreadMessages = unRead?.count || [];

                        const count = unreadMessages.length > 0 ?
                            unreadMessages.find(
                                (contactUnread) => contactUnread.sender === contact.contactId
                            ) : 0;
                        
                        return (
                            <ContactCard 
                                key={contact.contactId} 
                                contactId={contact.contactId}
                                contactImage={contact.profilePicture}  
                                contactName={contact.contactName}
                                contactType="contact"
                                countUnread = {count} 
                            />
                        )
                    })
                ) : (
                    <p>No tienes contactos aún.</p>
                )}</>
            }
        </div>
    );

}

export default ContactList;