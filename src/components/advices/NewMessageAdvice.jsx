const NewMessageAdvice = ({messages}) => {
    
    const unreadMessages = messages.count != undefined 
        ? messages.count.length > 0 
            ? messages.count.map(contact => contact.count).reduce((rec,cur)=>rec+cur)
            : null 
        : null;

    return (<>
        {unreadMessages &&    
            <h4>M {unreadMessages}</h4>
        }
    </>)

}

export default NewMessageAdvice;