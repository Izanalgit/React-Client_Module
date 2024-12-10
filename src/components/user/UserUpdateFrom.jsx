import { useState , useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchPATCH from "../../hooks/useFetchPATCH";

import Notification from '../popups/Notification';

const UserUpdateFrom = ({onComplete}) => {

    const {API,authToken,logedIn,changeName} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [newPswd,setNewPswd] = useState('');
    const [userData, setUserData] = useState({name:logedIn})

    const { 
        data: userUpdateData,
        loading: userUpdateLoading, 
        error: userUpdateError, 
        fetchData: userUpdate
    } = useFetchPATCH();

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

        if (!userData.name && !userData.pswd) {
            setErrorMessage('Introduce los cambios antes');
            return;
        }
        if (userData.pswd && userData.pswd != newPswd) {
            setErrorMessage('La contraseña debe coincidir');
            return;
        }

        if (isUpdating) return;

        try {
            setIsUpdating(true);
            const headers = { Authorization: `${authToken}` };
            await userUpdate(
                `${API}/api/user/update`, 
                {payload:userData},
                {headers}
            );


        } catch (err) {
            setErrorMessage('Error al actualizar el usuario. Intenta de nuevo.');
            console.log(err , userUpdateError)
        }
    };

    //Refresh user name from api
    useEffect(() => {
        const updateContext = async () => {
            if (!userUpdateLoading && userUpdateData) {
                console.log("Usuario actualizado: ",userUpdateData.message);
                await changeName(userUpdateData.name); 
                setSuccessMessage('Usuario actualizado exitosamente'); 
            } else if (!userUpdateLoading && userUpdateError) {
                setErrorMessage(userUpdateError);
                console.log(userUpdateError);
            }
            setIsUpdating(false);
        };
    
        updateContext();
    }, [userUpdateLoading, userUpdateData, userUpdateError]);

    return (
        <form onSubmit={handleSubmit} className="profile-form">
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
                    onClose={()=>{setSuccessMessage(''); onComplete();}}
                />
            } 
            
            <div>

            <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="pswd">Nueva contraseña</label>
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

            {!userUpdateLoading &&
                <button type="submit">Actualizar usuario</button>
            }
        </form>
    )
}

export default UserUpdateFrom;