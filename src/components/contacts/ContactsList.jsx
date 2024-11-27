import { useApp } from "../../context/AppContext";
import { useChatContext } from "../../context/ChatContext";

import ContactCard from "./ContactCard";

const ContactList = () => {

    const {userContacts} = useApp();
    const {unRead} = useChatContext();

    const contacts = userContacts?.contactsList?.contacts || [];
    const requests = userContacts?.contactsList?.requests || [];

    return (
        <div>
            <h2>Contactos</h2>
            {contacts.length > 0 ? (
                contacts.map((contact) => {
                    const unreadMessages = unRead.count || [];

                    const count = unreadMessages.length > 0 ?
                        unreadMessages.find(
                            (contactUnread) => contactUnread.sender === contact.contactId
                        ) : 0;
                    
                    return (
                        <ContactCard 
                            key={contact.contactId} 
                            contactId={contact.contactId} 
                            contactName={contact.contactName}
                            contactType="contact"
                            countUnread = {count} 
                        />
                    )
                })
            ) : (
                <p>No tienes contactos aún.</p>
            )}

            <h2>Solicitudes de Contacto</h2>
            {requests.length > 0 ? (
                requests.map((request) => (
                    <ContactCard 
                        key={request.contactId} 
                        contactId={request.contactId} 
                        contactName={request.contactName}
                        contactType="request" 
                    />
                ))
            ) : (
                <p>No tienes solicitudes pendientes.</p>
            )}
        </div>
    );

}

export default ContactList;