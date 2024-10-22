

const Profile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

    return (
        <div>
            {!isEditing && !isUploadingPhoto && <ProfileView />}
            {isEditing && <ProfileEditForm />}
            {isUploadingPhoto && <PhotoUploadForm />}

            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button onClick={() => setIsUploadingPhoto(!isUploadingPhoto)}>
                {isUploadingPhoto ? 'Cancel' : 'Upload Photo'}
            </button>
        </div>
      )
    

}

export default Profile;