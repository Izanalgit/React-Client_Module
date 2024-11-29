import { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import ChatWindow from "../components/chat/ChatWindow";

const Chat = () => {

    const { contactName, contactId } = useParams();
    const {userContacts} = useApp();

    const [ isContact , setIsContact ] = useState(false);
    
    const contacts = userContacts?.contactsList?.contacts
    const contact = contacts ? contacts.find((contact)=>contact.contactId == contactId) : null

    useEffect(()=>{
        if(contact)
            setIsContact(true);
    },[contact])

    return (<>
        {!isContact &&
            <h2>Contacto no encontrado ...</h2>
        }
        {isContact &&
            <>
                <h2>Chat con {contactName}:</h2>
                <ChatWindow contactId={contactId} contactPublicKey={contact?.contactPublicKey}/>
            </>
        }
    </>)
}

export default Chat;