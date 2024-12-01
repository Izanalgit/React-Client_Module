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

        const normalizeDate = (dateStr) => new Date(dateStr).getTime();

        try {
            // Last date to filter
            const lastMessageDate = currentChat?.messages?.length 
                ? currentChat.messages[currentChat.messages.length - 1].date 
                : null;

            // Index messages to filter
            const messageIndex = currentChat?.messages?.reduce((acc, msg) => {
                acc[msg.messageId] = msg.isRead;
                return acc;
            }, {});

            const { data } = await getMessages(contactId);
            
            // Filter new messages to decrypt
            const newMessages = data?.messages?.filter((message) => (
                normalizeDate(message.date) > normalizeDate(lastMessageDate)
            )) || [];

            // Filter own messages to mark as read
            const updatedMessages = data?.messages?.filter((message) => {
                const existingIsRead = messageIndex?.[message.messageId];
                return existingIsRead !== undefined 
                    && existingIsRead !== message.isRead 
                    && message.sender === "me";
            }) || [];

            // Decrypt new messages
            const decryptedMessages = newMessages?.length > 0 
                ? useDecryptChat(newMessages,userKey,userKeyPass)
                : [];

            setCurrentChat((prevChat) => {
                const updatedChatMessages = [...(prevChat?.messages || [])];
            
                // Update readed messages
                updatedMessages.forEach((updatedMessage) => {
                    const index = updatedChatMessages.findIndex((msg) => msg.messageId === updatedMessage.messageId);
                    if (index !== -1) 
                        updatedChatMessages[index].isRead = updatedMessage.isRead;
                });
            
                // Add changes and new messages
                return {
                    ...prevChat,
                    messages: [...updatedChatMessages, ...decryptedMessages],
                };
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
        if (authToken && ['NEW_MESSAGE','IS_READ'].includes(wsEvent)){
            countUnread();
            if(contactId) 
                loadChat(contactId);
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
