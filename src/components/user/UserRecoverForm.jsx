import { useState , useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchPOST from "../../hooks/useFetchPOST";

const UserRecoverFrom = ({userEmailLogIn}) => {

    const {API} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [newPswd0, setNewPswd0] = useState('');
    const [newPswd1, setNewPswd1] = useState('');
    const [recoverKey, setRecoverKey] = useState('');
    const [recoverPhase, setRecoverPhase] = useState(false);

    const { 
        data: userForgottenData,
        loading: userForgottenLoading, 
        error: userForgottenError, 
        fetchData: userForgotten
    } = useFetchPOST();

    const { 
        data: userRecoverData,
        loading: userRecoverLoading, 
        error: userRecoverError, 
        fetchData: userRecover
    } = useFetchPOST();

    // Imputs change handler
    const handleChange = (e) => {
        const { name, value} = e.target;
        switch (name) {
            case 'email':
                setUserEmail(value);
                break;
            case 'pswd':
                setNewPswd0(value);
            break;
            case 'newPswd':
                setNewPswd1(value);
            break;
            case 'recoverKey':
                setRecoverKey(value);
            break;
        }
    };

    // Submit mail handler
    const handleForgottenSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!userEmail) {
            setErrorMessage('Introduce tu correo electrónico');
            return;
        }

        if (isUpdating) return;

        try {
            setIsUpdating(true);
            await userForgotten(
                `${API}/api/user/forgotten`, 
                {payload:{email:userEmail}},
            );

        } catch (err) {
            setErrorMessage('Error al generar clave de recuperación. Intenta de nuevo.');
            console.log(err , userForgottenError)
        }
    };

    // Submit recover key handler
    const handleRecoverSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!recoverKey) {
            setErrorMessage('Introduce la calve de recuperación enviada a tu email');
            return;
        }
        if (!newPswd0) {
            setErrorMessage('Introduce una nueva contraseña');
            return;
        }
        if (newPswd0 !== newPswd1) {
            setErrorMessage('Las contraseñas deben coincidir');
            return;
        }

        if (isUpdating) return;

        try {
            setIsUpdating(true);
            await userRecover(
                `${API}/api/user/recover`, 
                {payload:{recoverKey:recoverKey,pswd:newPswd0,email:userEmail}},
            );

        } catch (err) {
            setErrorMessage('Error al actualizar con la nueva contraseña. Intenta de nuevo.');
            console.log(err , userRecoverError)
        }
    };

    //Default email
    useEffect(()=>{
        if(userEmailLogIn)
            setUserEmail(userEmailLogIn);
    },[])

    //Change phase to recover
    useEffect(() => {
        const toRecoverPhase = async () => {
            if (!userForgottenLoading && userForgottenData) {
                console.log("Clave generada : ",userForgottenData.message);
                setSuccessMessage('Clave de recuperación generada, revise su correo y copie la clave.');
                setRecoverPhase(true);
            } else if (!userForgottenLoading && userForgottenError) {
                setErrorMessage('Error al generar clave de recuperación. Intenta de nuevo.');
                console.log(userForgottenError);
            }
            setIsUpdating(false);
        };
    
        toRecoverPhase();
    }, [userForgottenLoading, userForgottenData, userForgottenError]);

    useEffect(() => {
        const recoverComplete = async () => {
            if (!userRecoverLoading && userRecoverData) {
                console.log("Recover : ",userRecoverData.message);
                setSuccessMessage('Contraseña actualizada con éxito');
            } else if (!userRecoverLoading && userRecoverError) {
                setErrorMessage('Error al generar clave de recuperación. Intenta de nuevo.');
                console.log(userRecoverError);
            }
            setIsUpdating(false);
        };
    
        recoverComplete();
    }, [userRecoverLoading, userRecoverData, userRecoverError]);

    return (<>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {!recoverPhase && 
            <form onSubmit={handleForgottenSubmit} className="recover-form">
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userEmailLogIn}
                        onChange={handleChange}
                    />
                </div>

                {!userForgottenLoading &&
                    <button type="submit">Generar Clave</button>
                }
            </form>
        }
        {recoverPhase &&    
            <form onSubmit={handleRecoverSubmit} className="recover-form">

                <div className="form-group">
                    <label htmlFor="recoverKey">Clave de recuperación :</label>
                    <input
                        type="text"
                        id="recoverKey"
                        name="recoverKey"
                        placeholder="XXXXXXXXXXXX"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pswd">Nueva contraseña :</label>
                    <input
                        type="password"
                        id="pswd"
                        name="pswd"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPswd">Introduce de nuevo la contraseña :</label>
                    <input
                        type="password"
                        id="newPswd"
                        name="newPswd"
                        onChange={handleChange}
                    />
                </div>

                {!userRecoverLoading &&
                    <button type="submit">Recuperar cuenta</button>
                }
            </form>
        }
        <button onClick={()=>window.location.reload()}>Volver</button>
    </>)
}

export default UserRecoverFrom;