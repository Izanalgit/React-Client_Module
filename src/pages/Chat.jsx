import { useParams } from 'react-router-dom';

import ChatWindow from "../components/chat/ChatWindow";

const Chat = () => {

    const { contactName, contactId } = useParams();

    return (

        <>
            <h2>Chat con {contactName}:</h2>
            <ChatWindow contactId={contactId}/>
        </>

    )
}

export default Chat;