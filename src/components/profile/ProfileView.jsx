import defaultProfile from '../../assets/images/profile-default.png';
import defaultCover from '../../assets/images/cover-default.png';

import '../../css/ProfileView.css';

const ProfileView = ({ userName, userProfileInfo = {} }) => {
    const {
        userProfile: {
            age = 'N/A',
            genre = 'N/A',
            orentation = 'N/A',
            special = 'N/A',
            location = 'N/A',
            bio = 'N/A',
            profilePicture = null,
            coverPhoto = null,
        } = {},
        userProfileExtended: {
            height = 'N/A',
            ethnia = 'N/A',
            religion = 'N/A',
            relationship = 'N/A',
            smoking = 'N/A',
            drinking = 'N/A',
        } = {}
    } = userProfileInfo;

    const coverImage = coverPhoto ? coverPhoto : defaultCover;
    const profileImage = profilePicture ? profilePicture : defaultProfile;

    return (
        <div className="profile-view">
            <div className="profile-header">
                <img src={coverImage} alt="Cover" className="cover-photo" />
                <div className="profile-picture-container">
                    <img src={profileImage} alt="Profile" className="profile-picture" />
                    <div className='user-title'>
                        <h2 className="user-name">{userName?userName:''}</h2>
                        <h3><strong>{special}</strong></h3>
                    </div>
                </div>
                <p>{bio}</p>
            </div>
            <div className="profile-info">
                <div className="info-section">
                    <p><strong>Edad:</strong> {age}</p>
                    <p><strong>Altura:</strong> {height}</p>
                    <p><strong>Género:</strong> {genre}</p>
                    <p><strong>Orientación:</strong> {orentation}</p>
                    <p><strong>Localidad:</strong> {location}</p>
                </div>
                <div className="info-section">
                    <p><strong>Etnia:</strong> {ethnia}</p>
                    <p><strong>Religión:</strong> {religion}</p>
                    <p><strong>Relación:</strong> {relationship}</p>
                    <p><strong>Fuma:</strong> {smoking ? 'Sí' : 'No'}</p>
                    <p><strong>Bebe:</strong> {drinking ? 'Sí' : 'No'}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
