import { useState } from "react";

import { useApp } from "../context/AppContext";
import ProfileEditForm from "../components/profile/ProfileEditForm";
import ProfileView from "../components/profile/ProfileView";
import PhotoUploadForm from "../components/profile/PhotoUploadForm";
import PhotoDeleteForm from "../components/profile/PhotoDeleteForm";

import '../css/UserProfile.css';
import '../css/FormsProfile.css';

const Profile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [isDeletingPhoto, setIsDeletingPhoto] = useState(false);

    const {logedIn,userProfile} = useApp();

    const handleCompleteAction = () => {
        setIsEditing(false);
        setIsUploadingPhoto(false);
        setIsDeletingPhoto(false);
    };

    return (
        <div className="main-content-profile">
            {!logedIn && <h5>No estás conectado!</h5>}
            {logedIn &&
            <>
                <div className="profile-buttons">
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        disabled={isUploadingPhoto || isDeletingPhoto}    
                    >
                        {isEditing ? 'Cancelar' : 'Editar Perfil'}
                    </button>
                    <button 
                        onClick={() => setIsUploadingPhoto(!isUploadingPhoto)}
                        disabled={isEditing || isDeletingPhoto}    
                    >
                        {isUploadingPhoto ? 'Cancelar' : 'Actualizar Imagen'}
                    </button>
                    <button 
                        onClick={() => setIsDeletingPhoto(!isDeletingPhoto)} 
                        disabled={isEditing || isUploadingPhoto}
                    >
                        {isDeletingPhoto ? 'Cancelar' : 'Eliminar Imagen'}
                    </button>
                </div>
                <div className="profile-content">
                    {!isEditing && !isUploadingPhoto && !isDeletingPhoto &&
                        <ProfileView  userName = {logedIn} userProfileInfo = {userProfile}/>
                    }
                    {isEditing && <ProfileEditForm onComplete={handleCompleteAction} />}
                    {isUploadingPhoto && <PhotoUploadForm onComplete={handleCompleteAction} />}
                    {isDeletingPhoto && <PhotoDeleteForm onComplete={handleCompleteAction} />}
                    
                </div>
            </>
            }
        </div>
      )
    

}

export default Profile;