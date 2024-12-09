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
    const [beforeDate, setBeforeDate] = useState(null);
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
    
    const { 
        getMessages,
        getOlderMessages,
        getCountMessages,
        sendMessage 
    } = useChatService(API,authToken);

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

    // Load messages
    const loadChat = async (contactId,lastDate=null) => {

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

        const normalizeDate = (dateStr) => new Date(dateStr).getTime();

        try {
            // Last date to filter
            const lastMessageDate = currentChat?.messages?.length 
                ? currentChat.messages[0].date 
                : null;

            // Get messages
            const { data } = lastDate
                ? await getOlderMessages(contactId,lastDate)
                : await getMessages(contactId)

            // Index messages to filter
            const messageIndex = lastDate
                ? null    
                : data?.messages?.reduce((acc, msg) => {
                    acc[msg.messageId] = msg.isRead;
                    return acc;
                }, {});                

            // Filter new messages to decrypt
            const newMessages = lastDate
                ? data?.messages?.filter((message) => (
                    normalizeDate(message.date) < normalizeDate(lastDate)
                ))    
                : data?.messages?.filter((message) => (
                    normalizeDate(message.date) > normalizeDate(lastMessageDate)
                )) || [];

            // Update read messages
            const updatedMessages = lastDate
            ? currentChat?.messages
            : currentChat?.messages?.map((message) =>(
                messageIndex?.[message.messageId]
                ? {...message,isRead: messageIndex?.[message.messageId]}
                : message  
            )) || [];

            // Decrypt new messages
            const decryptedMessages = newMessages?.length > 0 
                ? await useDecryptChat(newMessages,userKey,userKeyPass)
                : [];

            setCurrentChat((prevChat) => {                

                return lastDate
                    ? { ...prevChat, messages: [...updatedMessages, ...decryptedMessages]}
                    : { ...prevChat, messages: [...decryptedMessages, ...updatedMessages]}
                
            });
                
        } catch (err) {
            console.log(err)
            setError('Error al cargar los mensajes');
        } finally {
            setLoading(false);
        }
    };

    // Send message
    const sendChatMessage = async (message) => {

        setLoading(true);
        setError(null);

        try {
            // Encrypt and send message
            const { error: errorMsg } = await sendMessage(contactId, message, contactPublicKey, userPublicKey);
    
            // Error handler
            if (errorMsg) {
                if (errorMsg.includes("STATUS 402")) 
                    setError("Parece que no tienes premium ni tokens suficientes...");
                if (errorMsg.includes("STATUS 422"))
                    setError("Mensaje inválido...");

                return;
            }

            // Update user chat and premium on client
            await loadChat(contactId);
            await fetchAndStoreUserInfo('premy');

            // Send WS event
            webSocketMSG('NEW_MESSAGE', { to: contactId, content: message });

        } catch (err) {
            setError("Error crítico al enviar el mensaje.");
        } finally {
            setLoading(false);
        }
    };

    //Check read WS
    const setIsRead = (contactId) =>{ 
        webSocketMSG('IS_READ', { to: contactId});
        countUnread();
    };

    // When logued
    useEffect(() => {
        const count = async () =>{
            if (authToken)
                await countUnread();
        }
        count();
    }, [authToken]);

    // Onlaod Chat
    useEffect(() => {
        const chat = async () =>{
            if (contactId && authToken && userKeyPass)
                await loadChat(contactId)
        }
        chat();
    }, [authToken, contactId, userKeyPass]);
    
    // Onload older Chat
    useEffect(() => {
        const chatOld = async () =>{
            if (contactId && authToken && userKeyPass && beforeDate)
                await loadChat(contactId,beforeDate)
        }
        chatOld();
        setBeforeDate(null);
    }, [beforeDate]);

    // WS events
    useEffect(() => {
        if(wsEvent === 'NEW_MESSAGE')
            countUnread();
        if (authToken && contactId && ['NEW_MESSAGE','IS_READ'].includes(wsEvent)){
            loadChat(contactId);
        }
        cleanWsEvent();
    }, [wsEvent]);

    //Get contactId
    const getContactId = (id,key) => {
        if(id !== contactId)
            setCurrentChat(null);
        setContactId(id)
        setContactPublicKey(key)
    };
    
    //Get last date
    const getLastDate = (lastDate) => setBeforeDate(lastDate);

    return (
        <ChatContext.Provider 
            value={{ 
                currentChat,
                unRead,
                getContactId, 
                sendChatMessage,
                setIsRead,
                getLastDate,
                loading, 
                error 
            }}>
            {children}
        </ChatContext.Provider>
    );
};

const useChatContext = () => useContext(ChatContext);

export {ChatProvider,useChatContext}
