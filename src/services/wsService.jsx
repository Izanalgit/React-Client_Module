function handleIncomingMessage(message) {
    switch (message.type) {
        case 'FRIEND_REQUEST':
            console.log(`Nueva solicitud de amistad de ${message.from}`);
            // Aquí puedes actualizar tu estado o mostrar una notificación
            break;
        case 'NEW_MESSAGE':
            console.log(`Nuevo mensaje de ${message.from}`);
            // Aquí puedes actualizar el chat o mostrar una alerta
            break;
        default:
            console.warn('Tipo de mensaje desconocido:', message.type);
    }
}

export default handleIncomingMessage;