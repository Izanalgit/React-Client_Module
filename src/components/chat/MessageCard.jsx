import { useState , useRef ,useEffect } from "react";

import { useApp } from '../../context/AppContext';
import { useChatContext } from '../../context/ChatContext';

import useFetchPATCH from "../../hooks/useFetchPATCH";
import useOnSeen from "../../hooks/useOnSeen";

const MessageCard = ({messageObj , contactId }) => {

    const {API,authToken} = useApp();
    const {setIsRead} = useChatContext();

    const [isUpdating, setIsUpdating] = useState(false);
    
    const msgRef = useRef(null);
    const isSeen = useOnSeen(msgRef,"0px");

    const { 
        loading:checkLoading,
        data:checkSucces,
        error: checkMessageError, 
        fetchData: checkMessageRequest
    } = useFetchPATCH();

    const handleSeen = async () => {

        if (isUpdating) return;

        try {
            setIsUpdating(true);
            
            const headers = { Authorization: `${authToken}` };
            const payload = {
                messageId:messageObj.messageId,
                senderid:contactId
            };
            await checkMessageRequest(
                `${API}/api/chat/check`, 
                {payload},
                {headers}
            );
            
        } catch (err) {
            console.error(err, checkMessageError);
        } finally {
            setIsUpdating(false);
        }
    }

    useEffect(()=>{
        const seeMessage = async () =>{
            if(isSeen && !messageObj.isRead && messageObj.messageId){
                await handleSeen()
                messageObj.isRead = true;

            }
        }
        if(messageObj.sender !== "me")
            seeMessage();
    },[isSeen])

    useEffect(()=>{
        if(!checkLoading && checkSucces)
            setIsRead(contactId)
    },[checkLoading,checkSucces])

    return (
        <div ref={msgRef}>
            <strong>{messageObj.sender}:</strong> {messageObj.content}
            {messageObj.isRead && messageObj.sender === "me" && <h6>visto</h6>}
        </div>
    );

}

export default MessageCard;