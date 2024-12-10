import { useState , useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchGET from "../../hooks/useFetchGET";

import Loader from "../popups/Loader";
import Notification from "../popups/Notification";

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
        <div className="buying-content">
            {isUpdating && 
                <>  
                    <Loader />
                    <h4>PROCESANDO COMPRA</h4>
                </>
            }
            {errorMessage && 
                <Notification   
                    type={'error'} 
                    message={errorMessage} 
                    onClose={()=>setErrorMessage('')}
                />
            }
            {successMessage && 
                <Notification   
                    type={'success'} 
                    message={successMessage} 
                    onClose={()=>setSuccessMessage('')}
                />
            }
            <div className="buy-columns">
                <div className="premy-column">
                    <button onClick={()=>handleSubmit('premy')} disabled={isUpdating}>
                        Comprar Premium
                    </button>
                    <ul>
                        <li>
                            Mensajes ilimitados
                        </li>
                        <li>
                            Más cosas de premi
                        </li>
                    </ul>
                    <h5>10 € / 30 días</h5>
                </div>
                <div className="token-column">
                    <button onClick={()=>handleSubmit('message')} disabled={isUpdating}>
                        Comprar Tokens
                    </button>
                    <ul>
                        <li>
                            1 Mensaje por 1 Token
                        </li>
                        <li>
                            Más cosas de los tokens
                        </li>
                    </ul>
                    <h5>1 € / 2 tokens</h5>
                </div>
            </div>  
        </div>
    );

}

export default AddPremy;