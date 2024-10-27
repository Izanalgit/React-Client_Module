import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../context/AppContext";
import useFetchDELETE from "../../hooks/useFetchDELETE";

const UserDeleteForm = () => {
    const navigate = useNavigate();
    const {API,authToken,getLoged} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [userData, setUserData] = useState({})

    const { 
        data: userDeleteData,
        loading: userDeleteLoading, 
        error: userDeleteError, 
        fetchData: userDelete
    } = useFetchDELETE();

    // Imputs change handler
    const handleChange = (e) => {
        const { name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value, 
        });
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!userData.email &&  !userData.pswd) {
            setErrorMessage('Introduce todos los campos');
            return;
        }

        if (isUpdating) return;

        try {
            setIsUpdating(true);
            const headers = { Authorization: `${authToken}` };
            await userDelete(
                `${API}/api/user/delete`, 
                {payload:userData},
                {headers}
            );

        } catch (err) {
            setErrorMessage('Error al eliminar el usuario. Intenta de nuevo.');
            console.log(err , userDeleteError)
        }
    };

    useEffect(() => {
        const updateContext = async () => {
            if (!userDeleteLoading && userDeleteData) {
                console.log("Usuario eliminado : ",userDeleteData.message);
                setSuccessMessage('Usuario eliminado exitosamente');
                getLoged(false);
                navigate('/login');
            } else if (!userDeleteLoading && userDeleteError) {
                setErrorMessage('Error al eliminar el usuario. Intenta de nuevo.');
                console.log(userDeleteError);
            }
            setIsUpdating(false);
        };
    
        updateContext();
    }, [userDeleteLoading, userDeleteData, userDeleteError]);

    return (
    <>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} 
        {!successMessage &&
            <form onSubmit={handleSubmit} className="profile-form">
                <div>
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

                </div>

                {!userDeleteLoading &&
                    <button type="submit">Eliminar usuario</button>
                }
            </form>
        }
    </>
    )
}

export default UserDeleteForm;