import React, { useState , useEffect } from 'react';

import { useApp } from '../../context/AppContext';
import useFetchPOST from '../../hooks/useFetchPOST';

const PhotoUploadForm = ({onComplete}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageType, setImageType] = useState('profile');
    const {API,authToken,fetchAndStoreUserInfo} = useApp();
    const { fetchData, data, loading, error } = useFetchPOST();

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!selectedImage) {
            alert("Please select an image.");
            return;
        }

        //Add image to form
        const formData = new FormData();
        formData.append('image', selectedImage);

        const headers = { 
            Authorization: `${authToken}`, 
            'Content-Type': 'multipart/form-data' 
        };
        fetchData(`${API}/api/profile/image/${imageType}`, formData, { headers });
    };

    const handleTypeChange = (e) => {
        setImageType(e.target.value);
    };

    useEffect(() => {
        const updateProfile = async () => {
            if (!loading && data) {
                try {
                    await fetchAndStoreUserInfo();
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
        <div>
            <h3>Actualizar imagen</h3>

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

            <input type="file" accept="image/*" onChange={handleImageChange} />

            <button onClick={handleImageUpload} disabled={loading}>
                {loading ? "Subiendo..." : "Subir Imagen"}
            </button>

            {error && <p>{error}</p>}
        </div>
    );
};

export default PhotoUploadForm;