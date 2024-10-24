import React, { useState , useEffect} from 'react';

import { useApp } from '../../context/AppContext';
import useFetchPOST from '../../hooks/useFetchPOST';

const ProfileEditForm = () => {

    const { API, authToken, userProfile , fetchAndStoreUserInfo} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const [profileData, setProfileData] = useState({
        age : userProfile?.userProfile.age || '',
        genre: userProfile?.userProfile.genre || '',
        orentation: userProfile?.userProfile.orentation || '',
        special: userProfile?.userProfile.special || [],
        location: userProfile?.userProfile.location || undefined,
        bio: userProfile?.userProfile.bio || undefined,
        
    });
    const [profileExtenderData, setProfileExtenderData] = useState({
        height : userProfile?.userProfileExtended.height || undefined,
        ethnia : userProfile?.userProfileExtended.ethnia || undefined,
        religion : userProfile?.userProfileExtended.religion || undefined,
        relationship : userProfile?.userProfileExtended.relationship || undefined,
        smoking : userProfile?.userProfileExtended.smoking  || false,
        drinking : userProfile?.userProfileExtended.drinking || false,
        
        
    });

    const { 
        data: profileFetchData,
        loading: profileFetchLoading, 
        error: profileFetchError, 
        fetchData: updateProfile
    } = useFetchPOST();


    // Imputs change handler
    const handleChange = (e) => {
        const { name, value, options, type } = e.target;
    
        if (type === 'select-multiple') {
            const selectedValues = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);
            
            setProfileData({
                ...profileData,
                [name]: selectedValues,
            });
        } else {
            setProfileData({
                ...profileData,
                [name]: value, 
            });
        }
    };
    const handleChangeExtended = (e) => {
        const { name, value} = e.target;
    
        if (value === "true" || value === "false") {
            const boolean = value == "true"?true:false
            setProfileExtenderData({
                ...profileExtenderData,
                [name]: boolean,
            });
        } else 
            setProfileExtenderData({
                ...profileExtenderData,
                [name]: value, 
            });

    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!profileData.age || !profileData.genre || !profileData.orentation || !profileData.special) {
            setErrorMessage('Edad, género, orientación y condición especial son necesarios.');
            return;
        }

        if (isUpdating) return;

        try {
            setIsUpdating(true);
            const headers = { Authorization: `${authToken}` };
            await updateProfile(
                `${API}/api/profile/update`, 
                {payload:{ profile:profileData, extended:profileExtenderData}},
                {headers}
            );


        } catch (err) {
            setErrorMessage('Error al actualizar el perfil. Intenta de nuevo.');
            console.log(err , profileFetchError)
        }
    };

    //Refresh profile from api
    useEffect(() => {
        const updateContext = async () => {
            if (!profileFetchLoading && profileFetchData) {
                console.log("Perfil actualizado:", profileFetchData);
                await fetchAndStoreUserInfo(); 
                setSuccessMessage('Perfil actualizado exitosamente');
            } else if (!profileFetchLoading && profileFetchError) {
                setErrorMessage('Error al actualizar el perfil. Intenta de nuevo.');
                console.log(profileFetchError);
            }
            setIsUpdating(false);
        };
    
        updateContext();
    }, [profileFetchLoading, profileFetchData, profileFetchError]);

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>} 
            <div>
            <div className="form-group">
                <label htmlFor="age">Edad</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={profileData.age}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="genre">Género</label>
                <select
                    id="genre"
                    name="genre"
                    value={profileData.genre}
                    onChange={handleChange}
                >
                    <option value="">Selecciona tu género</option>
                    <option value="Hombre">Masculino</option>
                    <option value="Mujer">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="orentation">Orientación</label>
                <select
                    id="orentation"
                    name="orentation"
                    value={profileData.orentation}
                    onChange={handleChange}
                >
                    <option value="">Selecciona tu orientación</option>
                    <option value="Hetero">Heterosexual</option>
                    <option value="Homo">Homosexual</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="special">Condición</label>
                <input
                    type="text"
                    id="special"
                    name="special"
                    value={profileData.special}
                    onChange={handleChange}
                    placeholder="Tu condición"
                />
                <select
                    id="special"
                    name="special"
                    value={profileData.special}
                    onChange={handleChange}
                    multiple
                >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>
            
            <div className="form-group">
                <label htmlFor="location">Localidad</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    placeholder="Tu ciudad"
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

            </div>

            <div>

            <div className="form-group">
                <label htmlFor="height">Altura</label>
                <input
                    type="number"
                    id="height"
                    name="height"
                    value={profileExtenderData.height}
                    onChange={handleChangeExtended}
                />
            </div>

            <div className="form-group">
                <label htmlFor="ethnia">Etnia</label>
                <select
                    id="ethnia"
                    name="ethnia"
                    value={profileExtenderData.ethnia}
                    onChange={handleChangeExtended}
                >
                    <option value="">Selecciona tu etnia</option>
                    <option value="Asiática">Asiática</option>
                    <option value="Caucásico">Caucásico</option>
                    <option value="Amerindia">Amerindia</option>
                    <option value="Africana">Africana</option>
                    <option value="Sudeste Asiática">Sudeste Asiático</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="religion">Religión</label>
                <select
                    id="religion"
                    name="religion"
                    value={profileExtenderData.religion}
                    onChange={handleChangeExtended}
                >
                    <option value="">Selecciona tu religión</option>
                    <option value="Cristianísmo">Cristianísmo</option>
                    <option value="Judaísmo">Judaísmo</option>
                    <option value="Hinduísmo">Hinduísmo</option>
                    <option value="Islam">Islam</option>
                    <option value="Budísmo">Budísmo</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="relationship">Estado civil</label>
                <select
                    id="relationship"
                    name="relationship"
                    value={profileExtenderData.relationship }
                    onChange={handleChangeExtended}
                >
                    <option value="">Selecciona tu estado civil</option>
                    <option value="Soltería">Soltería</option>
                    <option value="Divorcio">Divorcio</option>
                    <option value="Pareja">Pareja</option>
                    <option value="Matrimonio">Matrimonio</option>
                    <option value="Viudedad">Viudedad</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="smoking">Fumar</label>
                <select
                    id="smoking"
                    name="smoking"
                    value={profileExtenderData.smoking }
                    onChange={handleChangeExtended}
                >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="drinking">Beber</label>
                <select
                    id="drinking"
                    name="drinking"
                    value={profileExtenderData.drinking }
                    onChange={handleChangeExtended}
                >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                </select>
            </div>
            
            </div>


            {!profileFetchLoading &&
                <button type="submit">Actualizar perfil</button>
            }
        </form>
    );
};

export default ProfileEditForm;