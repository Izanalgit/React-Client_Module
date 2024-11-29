import { createContext, useContext, useState , useEffect } from 'react';

import { useApp } from './AppContext';
import useChatService from '../services/chatService';
import useDecryptChat from '../hooks/useDecryptChat';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [currentChat, setCurrentChat] = useState(null);
    const [unRead , setUnRead] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [contactId, setContactId] = useState(null);
    const [contactPublicKey, setContactPublicKey] = useState(null);

    const {
        API,
        authToken,
        sendMessage:webSocketMSG,
        cleanWsEvent,
        wsEvent,
        fetchAndStoreUserInfo,
        userKey,
        userKeyPass,
        userPublicKey
    } = useApp();
    
    const { getMessages, getCountMessages, sendMessage } = useChatService(API,authToken);

    //Get contactId
    const getContactId = (id,key) => {
        setContactId(id)
        setContactPublicKey(key)
    };

    // Load messages
    const loadChat = async (contactId) => {

        if (!authToken) {
            setError("Token no disponible. Por favor, inicia sesión nuevamente.");
            return;
        }
        if (!userKeyPass) {
            setError("Llave Privada no disponible. Por favor, inicia sesión nuevamente.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data } = await getMessages(contactId);

            const messages = data?.messages?.length > 0 
                ? useDecryptChat(data.messages,userKey,userKeyPass)
                : [];

            setCurrentChat({messages});
        } catch (err) {
            console.log(err)
            setError('Error al cargar los mensajes');
        } finally {
            setLoading(false);
        }
    };

    // Count messages unread

    const countUnread = async () => {

        if (!authToken) {
            console.log("Token no disponible. Por favor, inicia sesión nuevamente.");
            return;
        }

        try {
            const { data } = await getCountMessages();
            setUnRead(data);
        } catch (err) {
            console.log('Error al cargar el contador de mensajes no leidos');
        }
    };

    // Send message
    const sendChatMessage = async (message) => {

        setLoading(true);
        setError(null);

        try {
            const { error: errorMsg } = await sendMessage(contactId, message, contactPublicKey, userPublicKey);
    
            if (errorMsg) {
                if (errorMsg.includes("STATUS 402")) 
                    setError("Parece que no tienes premium ni tokens suficientes...");
                if (errorMsg.includes("STATUS 422"))
                    setError("Mensaje inválido...");

                return;
            }

            await loadChat(contactId);
            await fetchAndStoreUserInfo('premy');
            webSocketMSG('NEW_MESSAGE', { to: contactId, content: message });

        } catch (err) {
            setError("Error crítico al enviar el mensaje.");
        } finally {
            setLoading(false);
        }
    };

    //Check read WS
    const setIsRead = async (contactId) =>{ 
        webSocketMSG('IS_READ', { to: contactId})
        await countUnread();
    };

    // When logued
    useEffect(() => {
        const chat = async () =>{
            if (authToken)
                await countUnread();
        }
        chat();
    }, [authToken]);

    // Onlaod Chat
    useEffect(() => {
        const chat = async () =>{
            if (contactId && authToken && userKeyPass)
                await loadChat(contactId)
        }
        chat();
    }, [authToken, contactId, userKeyPass]);

    // WS events
    useEffect(() => {
        if (contactId && authToken && userKeyPass && ['NEW_MESSAGE','IS_READ'].includes(wsEvent)){ 
            countUnread().then(loadChat(contactId))
        }
        cleanWsEvent();
    }, [wsEvent]);
    

    return (
        <ChatContext.Provider 
            value={{ 
                currentChat,
                unRead,
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
