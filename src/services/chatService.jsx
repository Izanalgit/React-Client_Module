import useFetchGET from '../hooks/useFetchGET';
import usePairKeyServices from './pairKeyService';
import axios from 'axios';

const useChatService = (url,authToken) => {
    const getMessagesFetch = useFetchGET();
    const getOlderMessagesFetch = useFetchGET();
    const getCountFetch = useFetchGET();

    const {encryptMessageWithPublicKey} = usePairKeyServices();

    const getMessages = async (contactId) => {
        const headers = { Authorization: `${authToken}` };
        const chatData = await getMessagesFetch.fetchData(
            `${url}/api/chat/read/${contactId}`,
            { headers }
        );
        return { 
            data: chatData
        };
    };

    const getOlderMessages = async (contactId,lastDate) => {
        const headers = { Authorization: `${authToken}` };
        const chatData = await getOlderMessagesFetch.fetchData(
            `${url}/api/chat/read/${contactId}/${lastDate}`,
            { headers }
        );
        return { 
            data: chatData
        };
    };

    const getCountMessages = async () => {
        const headers = { Authorization: `${authToken}` };
        const countData = await getCountFetch.fetchData(`${url}/api/chat/count`, { headers });
        return { 
            data: countData
        };
    };

    const sendMessage = async (contactId,newMessage,contactKey,userKey) => {
        const headers = { Authorization: `${authToken}` };
        const payload = {
            recep:contactId,
            message:encryptMessageWithPublicKey(newMessage,contactKey),
            messageRemit:encryptMessageWithPublicKey(newMessage,userKey)};
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
        getCountMessages,
        getMessages,
        getOlderMessages
    };
};

export default useChatService;