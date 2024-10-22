import React, { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';

//MODELO BASICO -> poner imputs de perfil y perfil extendido (serparados?)

const ProfileEditForm = () => {
    // Extraer datos de perfil y API desde el contexto
    const { API, userProfile } = useApp();

    // Inicializa el estado del formulario con los valores del perfil desde el contexto
    const [profileData, setProfileData] = useState({
        name: userProfile?.name || '',  // Usamos el valor del contexto o una cadena vacía si no existe
        email: userProfile?.email || '',
        bio: userProfile?.bio || '',
        // Otros campos que tengas en el perfil
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Manejo del cambio de inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Validación simple
        if (!profileData.name || !profileData.email) {
            setErrorMessage('El nombre y el correo son obligatorios.');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(
                `${API}/api/user/profile`, // Asume que este es el endpoint para actualizar el perfil
                profileData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Si usas Bearer tokens
                    },
                }
            );

            setSuccessMessage('Perfil actualizado exitosamente');
            // Si necesitas actualizar el contexto con los nuevos datos, podrías hacerlo aquí.

        } catch (err) {
            setErrorMessage('Error al actualizar el perfil. Intenta de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    placeholder="Tu correo"
                />
            </div>

            <div className="form-group">
                <label htmlFor="bio">Biografía</label>
                <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    placeholder="Escribe algo sobre ti"
                />
            </div>

            {/* Otros campos del perfil pueden ir aquí */}

            <button type="submit">Actualizar perfil</button>
        </form>
    );
};

export default ProfileEditForm;