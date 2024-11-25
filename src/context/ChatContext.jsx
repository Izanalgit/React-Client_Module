import { createContext, useContext, useState , useEffect } from 'react';

import { useApp } from './AppContext';
import useChatService from '../services/chatService';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [currentChat, setCurrentChat] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [contactId, setContactId] = useState(null);

    const {API,authToken,sendMessage:webSocketMSG,cleanWsEvent,wsEvent} = useApp();
    const { getMessages, sendMessage } = useChatService(API,authToken);

    //Get contactId
    const getContactId = (id) => setContactId(id);

    // Load messages
    const loadChat = async (contactId) => {

        if (!authToken) {
            setError("Token no disponible. Por favor, inicia sesión nuevamente.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data } = await getMessages(contactId);
            setCurrentChat(data);
        } catch (err) {
            setError('Error al cargar los mensajes');
        } finally {
            setLoading(false);
        }
    };

    // Send message
    const sendChatMessage = async (contactId, message) => {

        setLoading(true);
        setError(null);

        try {
            const { error: errorMsg } = await sendMessage(contactId, message);
    
            if (errorMsg) {
                if (errorMsg.includes("STATUS 402")) 
                    setError("Parece que no tienes premium ni tokens suficientes...");
                if (errorMsg.includes("STATUS 422"))
                    setError("Mensaje inválido...");

                return;
            }

            await loadChat(contactId);
            webSocketMSG('NEW_MESSAGE', { to: contactId, content: message });

        } catch (err) {
            setError("Error crítico al enviar el mensaje.");
        } finally {
            setLoading(false);
        }
    };

    //Check read WS
    const setIsRead = (contactId) => webSocketMSG('IS_READ', { to: contactId});

    useEffect(() => {
        const chat = async () =>{
            if (contactId && authToken) 
                await loadChat(contactId);
        }
        chat();
    }, [authToken, contactId]);

    useEffect(() => {
        const chatWs = async () =>{
            if (contactId && authToken && ['NEW_MESSAGE','IS_READ'].includes(wsEvent)) 
                await loadChat(contactId);
                cleanWsEvent();
        }
        chatWs();
    }, [wsEvent]);
    

    return (
        <ChatContext.Provider 
            value={{ 
                currentChat,
                getContactId, 
                sendChatMessage,
                setIsRead, 
                loading, 
                error 
            }}>
            {children}
        </ChatContext.Provider>
    );
};

const useChatContext = () => useContext(ChatContext);

export {ChatProvider,useChatContext}
