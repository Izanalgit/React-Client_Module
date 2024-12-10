import { useState , useEffect} from "react";

import { useApp } from "../../context/AppContext";
import useFetchPATCH from "../../hooks/useFetchPATCH";

import Notification from "../popups/Notification";

const ContactResponse = ({contactId}) => {

    const {API,authToken,fetchAndStoreUserInfo} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const { 
        data: responseContactData,
        loading: responseContactLoading, 
        error: responseContactError, 
        fetchData: responseContact
    } = useFetchPATCH();

    const handleSubmit = async (userAction) => {
        setErrorMessage('');

        if (isUpdating) return;

        try {
            setIsUpdating(true);
            
            const headers = { Authorization: `${authToken}` };
            let payload;
            
            if(userAction == "accept")
                payload = {newContact:contactId};
            if(userAction == "decline")
                payload = {newContact:contactId,decline:true};

            await responseContact(
                `${API}/api/contacts/add`, 
                {payload},
                {headers}
            );
            
        } catch (err) {
            console.error(err,responseContactError);
            setErrorMessage("Error inesperado al responder la solicitud.");
        }
    }

    useEffect(()=>{
        const requestResponse = async()=>{
            if(responseContactData && !responseContactLoading){
                console.log(responseContactData.message)
                await fetchAndStoreUserInfo('contacts');
            }
            if (responseContactError && !responseContactLoading) {
                console.log(responseContactError)
                setErrorMessage("Hubo un error al gestionar la solicitud de contacto.");
            }
            setIsUpdating(false);
        }

        requestResponse();
    },[responseContactData, responseContactLoading, responseContactError])

    return (
        <div className="response-button">
            <button onClick={()=>handleSubmit('accept')} disabled={isUpdating}>
                {isUpdating ? "Aceptando..." : "Aceptar"}
            </button>
            <button onClick={()=>handleSubmit('decline')} disabled={isUpdating}>
                {isUpdating ? "Denegando..." : "Denegar"}
            </button>
            {errorMessage && 
                <Notification   
                    type={'error'} 
                    message={errorMessage} 
                    onClose={()=>setErrorMessage('')}
                />
            }
        </div>
    );

}

export default ContactResponse;