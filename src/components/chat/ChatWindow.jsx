import { useState, useEffect } from 'react';
import { useChatContext } from '../../context/ChatContext';
import MessageCard from './MessageCard';
 
import Loader from '../popups/Loader';
import Notification from '../popups/Notification';
import '../../css/Chat.css';

const ChatWindow = ({ contactId , contactPublicKey}) => {

    const [errorMessage, setErrorMessage] = useState(null);

    const { 
        currentChat,
        getContactId,
        sendChatMessage,
        getLastDate,
        loading,
        error
    } = useChatContext();

    useEffect(() => {
        if(contactId){
            getContactId(contactId,contactPublicKey);
        }
    }, [contactId]);

    useEffect(()=>{
        if(error)
            setErrorMessage(error)
    },[error])

    const handleSendMessage = async (message) => {
        await sendChatMessage(message);
    };

    const hadleGetOlderChat = (lastDate) => {
        getLastDate(lastDate);
    }

    return (
        <div className='chat-container'>
            {loading && <Loader />}
            {errorMessage && 
                <Notification   
                    type={'error'} 
                    message={errorMessage} 
                    onClose={()=>setErrorMessage(null)}
                />
            }
            {currentChat?.messages?.length > 0 &&
                <ul>
                    {currentChat?.messages?.map((msg,index) => (
                        <li key={`${contactId}${index}`}>
                            {(currentChat?.messages?.length >= 10 && 
                            currentChat?.messages?.length - 1 === index) && (
                                <p onClick={() => hadleGetOlderChat(msg.date)}>... cargar más ...</p>
                            )}
                            <div className={msg.sender === 'me' ? 'my-msg' : 'contact-msg'}>
                                <MessageCard messageObj={msg} contactId={contactId}/>
                            </div>
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
