import { useState , useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchGET from "../../hooks/useFetchGET";

const AddPremy = () => {

    const {API , authToken ,fetchAndStoreUserInfo} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const { 
        data: buyPremyData,
        loading: buyPremyLoading, 
        error: buyPremyError, 
        fetchData: buyPremy
    } = useFetchGET();

    const handleSubmit = async (tokenType) => {
        setErrorMessage('');
        setSuccessMessage('');

        if (isUpdating) return;

        try {
            setIsUpdating(true);

            const headers = { Authorization: `${authToken}` };
            await buyPremy(
                `${API}/api/premy/addToken/${tokenType}`, 
                {headers}
            );
            
        } catch (err) {
            setErrorMessage("Error inesperado al enviar solicitud de compra.");
            console.error(err, buyPremyError);
        }
    }

    useEffect(()=>{
        const requestResponse = async()=>{
            if(buyPremyData && !buyPremyLoading){
                    console.log(buyPremyData.message);
                    await fetchAndStoreUserInfo();
                    setSuccessMessage("Compra realizada con éxito.");
            }
            if (buyPremyError && !buyPremyLoading) {
                console.log(buyPremyError)
                setErrorMessage("Hubo un error en la solicitud de compra de tokens.");
            }
            setIsUpdating(false);
        }

        requestResponse();
    },[buyPremyData, buyPremyLoading, buyPremyError])

    return (
        <div>
            {isUpdating && <h3>PROCESANDO COMPRA</h3>}
            <button onClick={()=>handleSubmit('premy')} disabled={isUpdating}>
                Comprar Premium
            </button>
            <button onClick={()=>handleSubmit('message')} disabled={isUpdating}>
                Comprar Tokens
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );

}

export default AddPremy;