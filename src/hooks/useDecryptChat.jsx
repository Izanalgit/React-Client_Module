import usePairKeyServices from "../services/pairKeyService";

const useDecryptChat = (chat, encryptedUserPrivateKey, passObj) => {
    
    const { decryptPrivateKey, decryptMessageWithPrivateKey } = usePairKeyServices();

    const { rps, riv, rsa } = passObj;

    const userPrivateKey = decryptPrivateKey(encryptedUserPrivateKey, rps, riv, rsa);
        
    if (!userPrivateKey) 
        return chat; 

    const decryptedChat = chat.map((message) => {
        const decryptedContent = decryptMessageWithPrivateKey(message.content, userPrivateKey);

        return {
            ...message,
            content: decryptedContent,
        };
    });

    return decryptedChat;
};

export default useDecryptChat;