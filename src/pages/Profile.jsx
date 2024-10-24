import { useState } from "react";

import { useApp } from "../context/AppContext";
import ProfileEditForm from "../components/profile/ProfileEditForm";
import ProfileView from "../components/profile/ProfileView";
import PhotoUploadForm from "../components/profile/PhotoUploadForm";

const Profile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

    const {logedIn,userProfile} = useApp();

    const handleCompleteAction = () => {
        setIsEditing(false);
        setIsUploadingPhoto(false);
    };

    return (
        <>
            {!logedIn && <h5>No estás conectado!</h5>}
            {logedIn &&
                <div>
                    {!isEditing && !isUploadingPhoto && 
                        <ProfileView  userName = {logedIn} userProfileInfo = {userProfile}/>
                    }
                    {isEditing && <ProfileEditForm onComplete={handleCompleteAction} />}
                    {isUploadingPhoto && <PhotoUploadForm onComplete={handleCompleteAction} />}

                    <button onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancelar' : 'Editar Perfil'}
                    </button>
                    <button onClick={() => setIsUploadingPhoto(!isUploadingPhoto)}>
                        {isUploadingPhoto ? 'Cancelar' : 'Actualizar Imagen'}
                    </button>
                </div>
            }
        </>
      )
    

}

export default Profile;