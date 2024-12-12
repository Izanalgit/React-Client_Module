import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useApp } from '../../context/AppContext';
import useFetchGET from '../../hooks/useFetchGET';

import ProfileView from '../profile/ProfileView';
import ContactRequest from './ContactRequest';

import Loader from '../popups/Loader';
import Notification from '../popups/Notification';

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
        {loading && <Loader />}
        {contactError &&
            <Notification   
                type={'error'} 
                message='Error al cargar el perfil del contacto ...' 
                onClose={()=>setContactError(false)}
            />
        }
        {contactProfile && !contactError && !loading &&
        <>
            <div className='contact-profile-container'>
                {contactName &&
                    <div className='link-container'>
                        <Link to={`/chat/${contactName}/${contactId}`} className="chat-icon-link" />
                    </div>
                }
                <ProfileView userName={contactName} userProfileInfo={contactProfile}/>

            </div>
            {!contactName &&
                <ContactRequest contactId={contactId} />
            }
        </>}
    </>);
};

export default ContactProfile;