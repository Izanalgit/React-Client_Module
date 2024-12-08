import { useState ,useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchPATCH from "../../hooks/useFetchPATCH";

const ContactRequest = ({contactId}) => {

    const {API,authToken,fetchAndStoreUserInfo} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const { 
        data: contactRequestData,
        loading: contactRequestLoading, 
        error: contactRequestError, 
        fetchData: contactRequest
    } = useFetchPATCH();

    const handleSubmit = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (isUpdating) return;

        try {
            setIsUpdating(true);

            const headers = { Authorization: `${authToken}` };
            const payload = {newContact:contactId};
            await contactRequest(
                `${API}/api/contacts/request`, 
                {payload},
                {headers}
            );
            
        } catch (err) {
            setErrorMessage("Error inesperado al enviar solicitud.");
            console.error(err, contactRequestError);
        }
    }

    useEffect(()=>{
        const requestResponse = async()=>{
            if(contactRequestData && !contactRequestLoading){
                    console.log(contactRequestData.message);
                    await fetchAndStoreUserInfo();
                    setSuccessMessage("Solicitud de contacto enviada con éxito.");
            }
            if (contactRequestError && !contactRequestLoading) {
                console.log(contactRequestError)
                setErrorMessage("Hubo un error en la solicitud de contacto.");
            }
            setIsUpdating(false);
        }

        requestResponse();
    },[contactRequestData, contactRequestLoading, contactRequestError])

    return (
        <div className="request-button">
            <button onClick={handleSubmit} disabled={isUpdating}>
                {isUpdating ? "Enviando..." : "Enviar solicitud"}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );

}

export default ContactRequest;