const NewMessageAdvice = ({ messages }) => {
    let unreadMessages = null;

    if (messages && Array.isArray(messages.count)) {
        unreadMessages = messages.count.length > 0
            ? messages.count
                .map(contact => contact.count || 0) 
                .reduce((rec, cur) => rec + cur, 0)
            : null;
    }

    return (
        <>
            {unreadMessages !== null && unreadMessages > 0 && (
                <h4>M {unreadMessages}</h4>
            )}
        </>
    );
};

export default NewMessageAdvice;