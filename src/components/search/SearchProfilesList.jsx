import SearchProfileCard from "./SearchProfileCard";

const SearchProfilesList = ({profiles}) => {

    return (
        <>
            {profiles?.length > 0 ? 
                profiles.map((profile)=> (
                    <SearchProfileCard
                        key={profile.userId} 
                        contactId = {profile.userId} 
                        contactName = {profile.name}
                    />
                ))
                : <p>No se ha encontrado un perfil adecuado...</p>
            }

        
        </>
    );
}

export default SearchProfilesList;