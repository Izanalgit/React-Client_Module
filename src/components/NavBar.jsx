import {Link} from 'react-router-dom';

// import '../css/NavBar.css'  ->   className={'butNav glow'}

const NavBar = () => {
    return(
        <nav>
            <Link to="/" >Inicio</Link>
            <Link to="/login" >Log In</Link>
            <Link to="/profile" >Perfil</Link>
            <Link to="/contacts" >Buscar</Link>
            <Link to="/chat" >Mensages</Link>
        </nav>
    );
}

export default NavBar;