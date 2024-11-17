import useFetchGET from '../hooks/useFetchGET';
import useFetchPOST from '../hooks/useFetchPOST';

const useChatService = (url,authToken) => {
    const getMessagesFetch = useFetchGET();
    const sendMessagesFetch = useFetchPOST(); 

    const getMessages = async (contactId) => {
        const headers = { Authorization: `${authToken}` };
        const chatData = await getMessagesFetch.fetchData(`${url}/api/chat/read/${contactId}`, { headers });
        return { 
            data: chatData,
            loading: getMessagesFetch.loading, 
            error: getMessagesFetch.error 
        };
    };

    const sendMessage = async (contactId,newMessage) => {
        const headers = { Authorization: `${authToken}` };
        const payload = {recep:contactId,message:newMessage};
        const messageData = await sendMessagesFetch.fetchData(`${url}/api/chat/send`,{payload} ,{headers});
        return { 
            data: messageData,
            loading: sendMessagesFetch.loading, 
            error: sendMessagesFetch.error 
        };
    };


    return {
        sendMessage,
        getMessages
    };
};

export default useChatService;