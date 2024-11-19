import useFetchGET from '../hooks/useFetchGET';
import axios from 'axios';

const useChatService = (url,authToken) => {
    const getMessagesFetch = useFetchGET();

    const getMessages = async (contactId) => {
        const headers = { Authorization: `${authToken}` };
        const chatData = await getMessagesFetch.fetchData(`${url}/api/chat/read/${contactId}`, { headers });
        return { 
            data: chatData
        };
    };

    const sendMessage = async (contactId,newMessage) => {
        const headers = { Authorization: `${authToken}` };
        const payload = {recep:contactId,message:newMessage};
        try {
            const response = await axios.post(`${url}/api/chat/send`, {payload}, { headers });
            return { data: response.data, error: null };
        } catch (error) {
            const errorMessage = error.response
                ? `STATUS ${error.response.status} : ${
                      error.response.data.messageErr ||
                      (error.response.data.errors
                          ? error.response.data.errors.map((err) => err.msg).join(", ")
                          : "Error desconocido al enviar mensaje ...")
                  }`
                : "El servidor no responde";
            return { data: null, error: errorMessage };
        }
    };
    


    return {
        sendMessage,
        getMessages
    };
};

export default useChatService;