
const NewContactAdvice = ({requests}) => {

    const friendRequests = requests 
        ? requests.contactsList.requests
        : [];

    return (<>
        {friendRequests.length > 0 &&    
            <h4>R {friendRequests.length}</h4>
        }
    </>)

}

export default NewContactAdvice;