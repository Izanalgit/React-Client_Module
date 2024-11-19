import {Link} from 'react-router-dom';

// import '../css/NavBar.css'  ->   className={'butNav glow'}

const NavBar = () => {
    return(
        <nav>
            <Link to="/" >Inicio - </Link>
            <Link to="/dashboard" >Dashboard - </Link>
            <Link to="/profile" >Perfil - </Link>
            <Link to="/contacts" >Contactos - </Link>
            <Link to="/login" >CONECTAR / </Link>
            <Link to="/logout" >DESCONTECTAR</Link>
        </nav>
    );
}

export default NavBar;