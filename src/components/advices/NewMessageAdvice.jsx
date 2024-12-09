import messagesIamge from '../../assets/images/icons/chat.png'

const NewMessageAdvice = ({ messages }) => {
    let unreadMessages = null;

    if (messages && Array.isArray(messages.count)) {
        unreadMessages = messages.count.length > 0
            ? messages.count
                .map(contact => contact.count || 0) 
                .reduce((rec, cur) => rec + cur, 0)
            : null;
    }
    if(unreadMessages > 99)
        unreadMessages = 99;

    return (
        <>
            {unreadMessages !== null && unreadMessages > 0 && (
            <div>
                <img src={messagesIamge} />
                <h4>{unreadMessages}</h4>
            </div>
            )}
        </>
    );
};

export default NewMessageAdvice;