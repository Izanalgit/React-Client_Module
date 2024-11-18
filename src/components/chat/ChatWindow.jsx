import { useEffect } from 'react';
import { useChatContext } from '../../context/ChatContext';

const ChatWindow = ({ contactId }) => {
    const { currentChat, getContactId, sendChatMessage, loading, error } = useChatContext();

    useEffect(() => {
        if(contactId)
            getContactId(contactId);
    }, [contactId]);

    const handleSendMessage = async (message) => {
        await sendChatMessage(contactId, message);
    };

    return (
        <div>
            {loading && <p>Cargando mensajes...</p>}
            {error && <p>{error}</p>}
            {currentChat?.messages?.length > 0 &&
                <ul>
                    {currentChat?.messages?.map((msg,index) => (
                        <li key={`message${index}`}>
                            <strong>{msg.sender}:</strong> {msg.content}
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
