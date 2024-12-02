import { useEffect } from 'react';
import { useChatContext } from '../../context/ChatContext';
import MessageCard from './MessageCard';
 
const ChatWindow = ({ contactId , contactPublicKey}) => {
    const { 
        currentChat,
        getContactId,
        sendChatMessage,
        getLastDate,
        loading,
        error
    } = useChatContext();

    useEffect(() => {
        if(contactId)
            getContactId(contactId,contactPublicKey);
    }, [contactId]);

    const handleSendMessage = async (message) => {
        await sendChatMessage(message);
    };

    const hadleGetOlderChat = (lastDate) => {
        getLastDate(lastDate);
    }

    return (
        <div>
            {loading && <p>Cargando mensajes...</p>}
            {error && <p>{error}</p>}
            {currentChat?.messages?.length > 0 &&
                <ul>
                    {currentChat?.messages?.map((msg,index) => (
                        <li key={`${contactId}${index}`}>
                            {(currentChat?.messages?.length >= 10 && 
                            currentChat?.messages?.length - 1 === index) && (
                                <p onClick={() => hadleGetOlderChat(msg.date)}>... cargar más ...</p>
                            )}
                            <MessageCard messageObj={msg} contactId={contactId}/>
                        </li>
                    ))}
                </ul>
            }
            <input
                type="text"
                placeholder="Escribe un mensaje..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage(e.target.value);
                }}
            />
        </div>
    );
};

export default ChatWindow;
