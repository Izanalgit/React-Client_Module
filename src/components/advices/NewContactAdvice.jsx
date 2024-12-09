import messagesIamge from '../../assets/images/icons/contact.png'

const NewContactAdvice = ({requests}) => {

    const friendRequests = requests 
        ? requests.contactsList.requests
        : [];

    let requestCount = friendRequests.length;

    if(requestCount > 99)
        requestCount = 99;

    return (<>
        {friendRequests.length > 0 &&(
        <div>
            <img src={messagesIamge} />    
            <h4>{requestCount}</h4>
        </div>
        )}
    </>)

}

export default NewContactAdvice;