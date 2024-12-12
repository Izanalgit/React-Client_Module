import { useApp } from '../context/AppContext';
import '../css/Footer.css';

const Footer = () =>{

    const {toggleTheme , theme} = useApp();

    return (<>
        <footer>
            <button onClick={toggleTheme}>
                    Cambiar a {theme === "light" ? "Oscuro" : "Claro"}
            </button>
            <p>© 2024 Tu Plataforma de Citas. Todos los derechos reservados.</p>
    </footer>
    </>)


}

export default Footer;