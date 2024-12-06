import {Link} from 'react-router-dom';

import { useApp } from '../context/AppContext';
import { useChatContext } from '../context/ChatContext';

import NewContactAdvice from './advices/NewContactAdvice';
import NewMessageAdvice from './advices/NewMessageAdvice';

// import '../css/NavBar.css'  ->   className={'butNav glow'}

const NavBar = () => {

    const {userContacts , logedIn} = useApp();
    const {unRead} = useChatContext();

    return(<>
        <nav>
            <Link to="/" >Inicio - </Link>
            <Link to="/dashboard" >Dashboard - </Link>
            <Link to="/profile" >Perfil - </Link>
            <Link to="/contacts" >Contactos - </Link>
            <Link to="/search" >Buscar - </Link>
            <Link to="/login" >CONECTAR / </Link>
            <Link to="/logout" >DESCONTECTAR</Link>
        </nav>
        {logedIn &&
            <>
                <NewContactAdvice requests={userContacts} />
                <NewMessageAdvice messages={unRead} />
            </>
        }
    </>);
}

export default NavBar;