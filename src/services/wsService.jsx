function handleIncomingMessage(message) {
    switch (message.type) {
        case 'FRIEND_REQUEST':
            console.log(`Nueva solicitud de amistad de ${message.from}`);
            return 'FRIEND_REQUEST';
        case 'NEW_MESSAGE':
            console.log(`Nuevo mensaje de ${message.from}`);
            return 'NEW_MESSAGE';
        case 'IS_READ':
            console.log(`Mensaje leído de ${message.from}`);
            return 'IS_READ';
        default:
            console.warn('Tipo de mensaje desconocido:', message.type);
            return null;
    }
}

export default handleIncomingMessage;