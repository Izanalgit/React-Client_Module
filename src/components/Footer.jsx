import { useApp } from '../context/AppContext';
import '../css/Footer.css';

import moon from '../assets/images/icons/moon.ico';
import sun from  '../assets/images/icons/sun.ico';


const Footer = () =>{

    const {toggleTheme , theme} = useApp();

    return (<>
        <footer>
            <button onClick={toggleTheme}>
                    {theme === "light" 
                        ? <img src={moon} />
                        : <img src={sun} />
                    }
            </button>
            <p>© 2024 Tu Plataforma de Citas. Todos los derechos reservados.</p>
    </footer>
    </>)


}

export default Footer;