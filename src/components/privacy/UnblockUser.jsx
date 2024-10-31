import { useState ,useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchPOST from "../../hooks/useFetchPOST";

const UnblockUser = ({userId}) => {

    const {API,authToken,fetchAndStoreUserInfo} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const { 
        data: unBlockUserData,
        loading: unBlockUserLoading, 
        error: unBlockUserError, 
        fetchData: unBlockUser
    } = useFetchPOST();

    const handleSubmit = async () => {
        setErrorMessage('');
        setSuccessMessage('');

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
                    setSuccessMessage("Desbloqueo de usuario gestionado con éxito.");
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
        <div>
            <button onClick={handleSubmit} disabled={isUpdating}>
                {isUpdating ? "Desbloqueando..." : "Desbloquear usuario"}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );

}

export default UnblockUser;