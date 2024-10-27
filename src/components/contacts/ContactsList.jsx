import { useApp } from "../../context/AppContext";

import ContactCard from "./ContactCard";

const ContactList = () => {

    const {userContacts} = useApp();

    const contacts = userContacts?.contactsList?.contacts || [];
    const requests = userContacts?.contactsList?.requests || [];

    return (
        <div>
            <h2>Contactos</h2>
            {contacts.length > 0 ? (
                contacts.map((contact) => (
                    <ContactCard 
                        key={contact.contactId} 
                        contactId={contact.contactId} 
                        contactName={contact.contactName}
                        contactType="contact" 
                    />
                ))
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