import { useState ,useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchPOST from "../../hooks/useFetchPOST";

const BlockUser = ({userId}) => {

    const {API,authToken,fetchAndStoreUserInfo} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const { 
        data: blockUserData,
        loading: blockUserLoading, 
        error: blockUserError, 
        fetchData: blockUser
    } = useFetchPOST();

    const handleSubmit = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (isUpdating) return;

        try {
            setIsUpdating(true);

            const headers = { Authorization: `${authToken}` };
            const payload = {blockUser:userId};
            await blockUser(
                `${API}/api/privacy/block`, 
                {payload},
                {headers}
            );
            
        } catch (err) {
            setErrorMessage("Error inesperado al bloquear usuario.");
            console.error(err, blockUserError);
        }
    }

    useEffect(()=>{
        const block = async()=>{
            if(blockUserData && !blockUserLoading){
                    console.log(blockUserData.message)
                    await fetchAndStoreUserInfo();
                    setSuccessMessage("Bloqueo de usuario gestionado con éxito.");
            }
            if (blockUserError && !blockUserLoading) {
                console.log(blockUserError)
                setErrorMessage("Hubo un error al bloquear usuario.");
            }
            setIsUpdating(false);
        }

        block();
    },[blockUserData, blockUserLoading, blockUserError])

    return (
        <div>
            <button onClick={handleSubmit} disabled={isUpdating}>
                {isUpdating ? "Bloqueando..." : "Bloquear usuario"}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );

}

export default BlockUser;