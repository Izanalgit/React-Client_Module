ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
        case 'NEW_MESSAGE':
            // Mostrar notificación de nuevo mensaje
            alert(`Nuevo mensaje de ${data.from}: ${data.message}`);
            break;
        case 'FRIEND_REQUEST':
            // Mostrar notificación de nueva solicitud de amistad
            alert(`Nueva solicitud de amistad de ${data.from}`);
            break;
        default:
            console.log('Tipo de mensaje no reconocido:', data);
    }
};

//BASIC SCHEMA