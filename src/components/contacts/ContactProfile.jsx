import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useApp } from '../../context/AppContext';
import useFetchGET from '../../hooks/useFetchGET';

import ProfileView from '../profile/ProfileView';

const ContactProfile = ({contactId}) => {

    const {API,authToken,userContacts} = useApp();
    const { fetchData, data, loading, error } = useFetchGET();

    const [contactProfile , setContactProfile] = useState(null);
    const [contactError , setContactError] = useState(false);

    const contact = userContacts?.contactsList?.contacts.find((contact)=>contact.contactId == contactId);
    const contactName = contact?.contactName;

    useEffect(()=>{
        const getContactProfile = async () => {
            const headers = { 
                Authorization: `${authToken}`
            };
            await fetchData(`${API}/api/profile/${contactId}`,{ headers });
        };
        if(authToken){
            setContactError(false);
            getContactProfile();
        }
    },[authToken])
    
    useEffect(() => {

        if (!loading && data){
            const contactData = {
                userProfile:data.contactProfile,
                userProfileExtended:data.contactProfileExtended
            } 
            setContactProfile(contactData);
        }
        if (!loading && error) 
            setContactError(true);

    }, [loading, data]);

    return (<>
        {loading &&
            <h3>Cargando perfil del contacto ...</h3>
        }
        {contactError &&
            <h3>Error al cargar el perfil del contacto ...</h3>
        }
        {contactProfile && !contactError && !loading &&
            <>
                <ProfileView userName={contactName} userProfileInfo={contactProfile}/>
                <Link to={`/chat/${contactName}/${contactId}`}>Abrir chat</Link>
            </>
        }
    </>);
};

export default ContactProfile;