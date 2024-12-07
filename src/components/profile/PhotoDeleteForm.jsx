import React, { useState , useEffect } from 'react';

import { useApp } from '../../context/AppContext';
import useFetchGET from '../../hooks/useFetchGET';

const PhotoDeleteForm = ({onComplete}) => {
    const [imageType, setImageType] = useState('profile');
    const {API,authToken,fetchAndStoreUserInfo} = useApp();
    const { fetchData, data, loading, error } = useFetchGET();

    const handleImageDelete = async () => {
        if (!imageType) {
            alert("Porfavor seleccione que imagen desea eliminar.");
            return;
        }

        const headers = { 
            Authorization: `${authToken}`
        };
        fetchData(`${API}/api/profile/delete-image/${imageType}`, { headers });
    };

    const handleTypeChange = (e) => {
        setImageType(e.target.value);
    };

    useEffect(() => {
        const updateProfile = async () => {
            if (!loading && data) {
                try {
                    await fetchAndStoreUserInfo('profile');
                    console.log('Perfil actualizado');
                } catch (error) {
                    console.error('Error al actualizar el perfil:', error);
                } finally {
                    onComplete();
                }
            }
        };
        updateProfile();
    }, [loading, data]);

    return (
        <div className='image-form'>
            <h3>Eliminar imagen</h3>

            <label>
                <input
                    type="radio"
                    value="profile"
                    checked={imageType === 'profile'}
                    onChange={handleTypeChange}
                />
                Imagen de perfil
            </label>
            <label>
                <input
                    type="radio"
                    value="cover"
                    checked={imageType === 'cover'}
                    onChange={handleTypeChange}
                />
                Foto de portada
            </label>

            <button onClick={handleImageDelete} disabled={loading}>
                {loading ? "Borrando..." : "Eliminar Imagen"}
            </button>

            {error && <p>{error}</p>}
        </div>
    );
};

export default PhotoDeleteForm;