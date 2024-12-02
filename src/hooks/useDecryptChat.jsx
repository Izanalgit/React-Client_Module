import usePairKeyServices from "../services/pairKeyService";

const useDecryptChat = (chat, encryptedUserPrivateKey, passObj) => {

    const { decryptPrivateKey, decryptMessageWithPrivateKey } = usePairKeyServices();
    const { rps, riv, rsa } = passObj;

    const userPrivateKey = decryptPrivateKey(encryptedUserPrivateKey, rps, riv, rsa);

    if (!userPrivateKey) return chat;

    const decryptedChat = chat.map((message) =>
        new Promise((resolve) => {
            const decryptedContent = decryptMessageWithPrivateKey(message.content, userPrivateKey);
            resolve({ ...message, content: decryptedContent });
        })
    );

    return Promise.all(decryptedChat);
};
export default useDecryptChat;