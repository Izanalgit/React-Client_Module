import { useParams } from 'react-router-dom';

import ChatWindow from "../components/chat/ChatWindow";

const Chat = () => {

    const { contactId } = useParams();

    return (

        <>
            <h1>MENSAJES:</h1>
            <ChatWindow contactId={contactId}/>
        </>

    )
}

export default Chat;