import { useState, useEffect } from 'react';

import handleIncomingMessage from '../services/wsService';


function useWebSocket(API,authToken) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (authToken) {
            // WebSocket connect
            const ws = new WebSocket(`ws://${API}`);

            // Send auth token
            ws.onopen = () => {
                console.log('WebSocket conectado');
                ws.send(JSON.stringify({ token: authToken }));
            };

            // Incoming message handler
            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                handleIncomingMessage(message);
            };

            // Logout handler
            ws.onclose = () => {
                console.log('WebSocket desconectado');
            };

            // Errors handler
            ws.onerror = (error) => {
                console.error('Error en WebSocket:', error);
            };

            setSocket(ws);

            // Clean conexion when close
            return () => {
                ws.close();
            };
        }
    }, [authToken]);

    const sendMessage = (type, data) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type, ...data }));
        } else {
            console.error('WebSocket no está conectado');
        }
    };

    return { sendMessage };
}

export default useWebSocket;