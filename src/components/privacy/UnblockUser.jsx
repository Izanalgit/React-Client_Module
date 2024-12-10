import { useState ,useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchPOST from "../../hooks/useFetchPOST";

import Notification from "../popups/Notification";

const UnblockUser = ({userId}) => {

    const {API,authToken,fetchAndStoreUserInfo} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const { 
        data: unBlockUserData,
        loading: unBlockUserLoading, 
        error: unBlockUserError, 
        fetchData: unBlockUser
    } = useFetchPOST();

    const handleSubmit = async () => {
        setErrorMessage('');

        if (isUpdating) return;

        try {
            setIsUpdating(true);

            const headers = { Authorization: `${authToken}` };
            const payload = {unblockUser:userId};
            await unBlockUser(
                `${API}/api/privacy/unblock`, 
                {payload},
                {headers}
            );
            
        } catch (err) {
            setErrorMessage("Error inesperado al desbloquear usuario.");
            console.error(err, unBlockUserError);
        }
    }

    useEffect(()=>{
        const unblock = async()=>{
            if(unBlockUserData && !unBlockUserLoading){
                    console.log(unBlockUserData.message)
                    await fetchAndStoreUserInfo('blocks');
            }
            if (unBlockUserError && !unBlockUserLoading) {
                console.log(unBlockUserError)
                setErrorMessage("Hubo un error al desbloquear usuario.");
            }
            setIsUpdating(false);
        }

        unblock();
    },[unBlockUserData, unBlockUserLoading, unBlockUserError])

    return (
        <>
            <button onClick={handleSubmit} disabled={isUpdating}>
                {isUpdating ? "Desbloqueando..." : "Desbloquear"}
            </button>
            {errorMessage && 
                <Notification   
                    type={'error'} 
                    message={errorMessage} 
                    onClose={()=>setErrorMessage('')}
                />
            }
        </>
    );

}

export default UnblockUser;