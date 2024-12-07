import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import { useApp } from '../context/AppContext';
import { useChatContext } from '../context/ChatContext';

import NewContactAdvice from './advices/NewContactAdvice';
import NewMessageAdvice from './advices/NewMessageAdvice';

import '../css/NavBar.css' 

const NavBar = () => {

    const {userContacts , logedIn} = useApp();
    const {unRead} = useChatContext();

    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <div className="navegation">
            {logedIn && (
                <div className="warningsDiv">
                    <NewContactAdvice requests={userContacts} />
                    <NewMessageAdvice messages={unRead} />
                </div>
            )}

            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav className={menuOpen ? 'active' : ''}>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Inicio</NavLink>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Perfil</NavLink>
                <NavLink to="/contacts" className={({ isActive }) => (isActive ? 'active' : '')}>Contactos</NavLink>
                <NavLink to="/search" className={({ isActive }) => (isActive ? 'active' : '')}>Buscar</NavLink>
                {logedIn ? (
                    <NavLink to="/logout" className={({ isActive }) => (isActive ? 'active' : '')}>DESCONECTAR</NavLink>
                ) : (
                    <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>CONECTAR</NavLink>
                )}
            </nav>
        </div>
    );
}

export default NavBar;