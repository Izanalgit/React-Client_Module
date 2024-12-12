import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import '../css/Home.css';   

const Home = () => {

    const navigate = useNavigate();
    const {logedIn} = useApp();

    return (
        <>
            <header className="hero">
                <h1>Encuentra tu conexión especial 💕</h1>
                {logedIn
                    ?<>
                        <p>Muy buenas <b>{logedIn}</b>! Con ganas de conectar con alguien?</p>
                        <button 
                            className="cta-button" 
                            onClick={()=>navigate('/search')}
                        >Buscar</button>
                    </>
                    :<>
                        <p>Descubre personas con intereses similares y comienza una historia única.</p>
                        <button 
                            className="cta-button" 
                            onClick={()=>navigate('/login')}
                        >¡Regístrate ahora!</button>
                    </>
                }
                
            </header>

            <section className="features">
                <h2>¿Por qué elegirnos?</h2>
                <div className="features-grid">
                    <div>
                        <h3>🔍 Búsqueda avanzada</h3>
                        <p>Encuentra a quien buscas con nuestros filtros inteligentes y tu buen gusto.</p>
                    </div>
                    <div>
                        <h3>🔒 Seguridad garantizada</h3>
                        <p>Tus mensajes y privacidad siempre estarán protegidos con nuestra encriptación E2EE y doble capa en el servidor.</p>
                    </div>
                    <div>
                        <h3>✨ Funciones premium</h3>
                        <p>Descubre beneficios exclusivos y mensajes ilimitados para conectar más rápido.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2>Historias reales</h2>
                <div>
                    <blockquote>
                        "Conocí a alguien increíble gracias a esta plataforma. Es fácil de usar y segura. ¡Gracias!"
                    </blockquote>
                    <p>- Usuario feliz</p>
                </div>
            </section>

        </>
    );
};

export default Home;