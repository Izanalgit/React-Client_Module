import { useState , useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchPATCH from "../../hooks/useFetchPATCH";

import Notification from "../popups/Notification";

const ContactRemove = ({contactId}) => {

    const {API,authToken,fetchAndStoreUserInfo} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const { 
        data: contactRemoveData,
        loading: contactRemoveLoading, 
        error: contactRemoveError, 
        fetchData: contactRemove
    } = useFetchPATCH();

    const handleSubmit = async () => {
        setErrorMessage('');

        if (isUpdating) return;

        try {
            setIsUpdating(true);
            
            const headers = { Authorization: `${authToken}` };
            const payload = {removeContact:contactId};
            await contactRemove(
                `${API}/api/contacts/remove`, 
                {payload},
                {headers}
            );
            
        } catch (err) {
            console.error(err,contactRemoveError);
            setErrorMessage("Error inesperado al eliminar el contacto.");
        }
    }

    useEffect(()=>{
        const requestResponse = async()=>{
            if(contactRemoveData && !contactRemoveLoading){
                console.log(contactRemoveData.message)
                await fetchAndStoreUserInfo('contacts');
            }
            if (contactRemoveError && !contactRemoveLoading) {
                console.log(contactRemoveError)
                setErrorMessage("Hubo un error en la eliminación del contacto.");
            }
            setIsUpdating(false);
        }

        requestResponse();
    },[contactRemoveData, contactRemoveLoading, contactRemoveError])

    return (
        <div>
            <button onClick={handleSubmit} disabled={isUpdating}>
                {isUpdating ? "Eliminando..." : "Eliminar"}
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

export default ContactRemove;