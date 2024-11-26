function handleIncomingMessage(message) {
    switch (message.type) {
        case 'FRIEND_REQUEST':
            console.log(`Nueva solicitud de amistad de ${message.from}`);
            return 'FRIEND_REQUEST';
        case 'FRIEND_ACCEPT':
            console.log(`Solicitud de amistad aceptada de ${message.from}`);
            return 'FRIEND_ACCEPT';
        case 'FRIEND_REMOVED':
            console.log(`Amistad eliminada de ${message.from}`);
            return 'FRIEND_REMOVED';
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