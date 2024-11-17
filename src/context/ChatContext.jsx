import { createContext, useContext, useState } from 'react';

import { useApp } from './AppContext';
import useChatService from '../services/chatService';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [currentChat, setCurrentChat] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {API,authToken} = useApp();
    const { getMessages, sendMessage } = useChatService(API,authToken);

    // Load messages
    const loadChat = async (contactId) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await getMessages(contactId);
            console.log(data)
            setCurrentChat(data);
        } catch (err) {
            setError('Error al cargar los mensajes');
        } finally {
            setLoading(false);
        }
    };

    // Send message
    const sendChatMessage = async (contactId, message) => {
        try {
            const { data } = await sendMessage(contactId, message);
            loadChat(contactId) //REFACT !!!!
        } catch (err) {
            console.error('Error al enviar el mensaje:', err);
        }
    };

    return (
        <ChatContext.Provider 
            value={{ 
                currentChat, 
                loadChat, 
                sendChatMessage, 
                loading, 
                error 
            }}>
            {children}
        </ChatContext.Provider>
    );
};

const useChatContext = () => useContext(ChatContext);

export {ChatProvider,useChatContext}
