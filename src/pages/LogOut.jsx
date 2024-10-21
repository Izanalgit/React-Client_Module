import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useApp } from '../context/AppContext';

const Logout = () => {
    const navigate = useNavigate();
    const {API,logedIn,getLoged} = useApp();

    useEffect(() => {
        const logoutUser = async () => {
            
            const token = localStorage.getItem('authToken'); 

            if (token) {
                try {
                    await axios.post(
                        `${API}/api/user/logout`, 
                        {},
                        {
                            headers: {
                                Authorization: `${token}`,
                            },
                        }
                    );
                } catch (err) {
                    console.error('Error al hacer logout', err);
                } finally {
                    localStorage.removeItem('authToken');
                    getLoged(false);
                    navigate('/login');
                }
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <>
            {!logedIn && <h5>No estás conectado!</h5>}
            {logedIn &&
                <div>
                    <p>Cerrando sesión...</p>
                </div>
            }
        </>
    );
};

export default Logout;