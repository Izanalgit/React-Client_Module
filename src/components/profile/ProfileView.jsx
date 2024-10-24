
const ProfileView = ({ userName = 'Unknown', userProfileInfo = {} }) => {
    const {
        userProfile: {
            age = 'N/A',
            genre = 'N/A',
            orentation = 'N/A',
            special = 'N/A',
            location = 'N/A',
            bio = 'N/A',
            profilePicture = '',
            coverPhoto = '',
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

    return (
        <div className="profile-view">
            <div className="profile-header">
                <img src={coverPhoto} alt="Cover" className="cover-photo" />
                <img src={profilePicture} alt="Profile" className="profile-picture" />
                <h2>{userName}</h2>
            </div>
            <div className="profile-info">
                <p>Age: {age}</p>
                <p>Genre: {genre}</p>
                <p>Orientation: {orentation}</p>
                <p>Special: {special}</p>
                <p>Location: {location}</p>
                <p>Bio: {bio}</p>
                <p>Height: {height}</p>
                <p>Ethnia: {ethnia}</p>
                <p>Religion: {religion}</p>
                <p>Relationship: {relationship}</p>
                <p>Smoking: {smoking ? 'Yes' : 'No'}</p>
                <p>Drinking: {drinking ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
};

export default ProfileView;
