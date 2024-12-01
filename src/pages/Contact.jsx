import { useParams } from 'react-router-dom';

import ContactProfile from '../components/contacts/ContactProfile';

const Contact = () => {

    const { contactId } = useParams();

    return (<>
        <ContactProfile contactId={contactId}/>       
    </>)
}

export default Contact;