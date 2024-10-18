import { useState } from 'react';
import axios from 'axios';

import { useApp } from '../context/AppContext';

const Login = () => {
    const {API} = useApp();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `${API}/api/user/login`, 
                {payload:{ email:email, pswd:password }}
            );
            
            const token = response.headers['authorization'];

            if (token) {
                localStorage.setItem('authToken', token);  
                window.location.href = '/dashboard';
            } else setError('No se pudo obtener el token de autenticación.');

        } catch (err) {
            console.log(err.response.data.messageErr)
            setError('Credenciales inválidas, por favor inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;