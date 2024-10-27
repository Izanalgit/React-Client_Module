import SearchProfileCard from "./SearchProfileCard";

const SearchProfilesList = ({profiles}) => {

    return (
        <>
            {profiles.map((profile)=> (
                <SearchProfileCard
                    key={profile.userId} 
                    contactId = {profile.userId} 
                    contactName = {profile.name}
                />
            ))}

        
        </>
    );
}

export default SearchProfilesList;