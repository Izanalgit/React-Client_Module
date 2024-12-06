import { NavLink } from 'react-router-dom';

import { useApp } from '../context/AppContext';
import { useChatContext } from '../context/ChatContext';

import NewContactAdvice from './advices/NewContactAdvice';
import NewMessageAdvice from './advices/NewMessageAdvice';

import '../css/NavBar.css' 
//  ->   className={'butNav glow'}

const NavBar = () => {

    const {userContacts , logedIn} = useApp();
    const {unRead} = useChatContext();

    return(<div className='navegation'>
        {logedIn &&
            <div className='warningsDiv'>
                <NewContactAdvice requests={userContacts} />
                <NewMessageAdvice messages={unRead} />
            </div>
        }
        <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Inicio</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Perfil</NavLink>
            <NavLink to="/contacts" className={({ isActive }) => (isActive ? 'active' : '')}>Contactos</NavLink>
            <NavLink to="/search" className={({ isActive }) => (isActive ? 'active' : '')}>Buscar</NavLink>
            {logedIn ? (
                <NavLink to="/logout" className={({ isActive }) => (isActive ? 'active' : '')}>DESCONTECTAR</NavLink>
            ) : (
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>CONECTAR</NavLink>
            )}
        </nav>
    </div>);
}

export default NavBar;