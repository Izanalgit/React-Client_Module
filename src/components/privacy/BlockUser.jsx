import { useState ,useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchPOST from "../../hooks/useFetchPOST";

import Notification from "../popups/Notification";

const BlockUser = ({userId}) => {

    const {API,authToken,fetchAndStoreUserInfo} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const { 
        data: blockUserData,
        loading: blockUserLoading, 
        error: blockUserError, 
        fetchData: blockUser
    } = useFetchPOST();

    const handleSubmit = async () => {
        setErrorMessage('');

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
        <div className="block-button">
            <button onClick={handleSubmit} disabled={isUpdating}>
                {isUpdating ? "Bloqueando..." : "Bloquear"}
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

export default BlockUser;