import { useState , useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchPOST from "../../hooks/useFetchPOST";

const UserRegistForm = () => {

    const {API} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [newPswd,setNewPswd] = useState('');
    const [userData, setUserData] = useState({})

    const { 
        data: userRegistData,
        loading: userRegistLoading, 
        error: userRegistError, 
        fetchData: userRegist
    } = useFetchPOST();

    // Imputs change handler
    const handleChange = (e) => {
        const { name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value, 
        });
    };
    const handlePswdChange = (e) => {
        const {value} = e.target;
        setNewPswd(value)
    }

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!userData.name && !userData.email &&  !userData.pswd) {
            setErrorMessage('Introduce todos los campos');
            return;
        }
        if (userData.pswd && userData.pswd != newPswd) {
            setErrorMessage('La contraseña debe coincidir');
            return;
        }

        if (isUpdating) return;

        try {
            setIsUpdating(true);
            await userRegist(
                `${API}/api/user/new`, 
                {payload:userData}
            );

        } catch (err) {
            setErrorMessage('Error al registrar el usuario. Intenta de nuevo.');
            console.log(err , userRegistError)
        }
    };

    useEffect(() => {
        const updateContext = async () => {
            if (!userRegistLoading && userRegistData) {
                console.log("Usuario registrado: ",userRegistData.message);
                setSuccessMessage('Usuario registrado exitosamente, comprueba tu correo electrónico');
            } else if (!userRegistLoading && userRegistError) {
                setErrorMessage('Error al registrar el usuario. Intenta de nuevo.');
                console.log(userRegistError);
            }
            setIsUpdating(false);
        };
    
        updateContext();
    }, [userRegistLoading, userRegistData, userRegistError]);

    return (
    <>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} 
        {!successMessage &&
            <form onSubmit={handleSubmit} className="profile-form">
                <div>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pswd">Contraseña</label>
                    <input
                        type="password"
                        id="pswd"
                        name="pswd"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPswd">Introduce de nuevo la contraseña:</label>
                    <input
                        type="password"
                        id="newPswd"
                        name="newPswd"
                        onChange={handlePswdChange}
                    />
                </div>

                </div>

                {!userRegistLoading &&
                    <button type="submit">Registrar usuario</button>
                }
            </form>
        }
    </>
    )
}

export default UserRegistForm;