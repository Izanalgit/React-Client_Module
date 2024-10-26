import { useState } from "react";

import { useApp } from "../context/AppContext";
import UserUpdateFrom from "../components/user/UserUpdateFrom";
import UserDeleteForm from "../components/user/UserDeleteForm";


const Dashboard = () => {

    const [isEditingUser,setIsEditingUser] = useState(false);
    const [isDeletingUser,setIsDeletingUser] = useState(false);
    const [isManagingBlocks,setIsManagingBlocks] = useState(false);

    const {logedIn} = useApp();

    const handleCompleteAction = () => {
        setIsEditingUser(false);
        setIsManagingBlocks(false);
    };

    return (
        
        <>
            {!logedIn && <h5>No estás conectado!</h5>}
            {logedIn &&
            <>
                <h2>DASHBORAD</h2>
                {!isEditingUser && !isDeletingUser && !isManagingBlocks &&
                    <p>Hola {logedIn}</p>
                }
                {isEditingUser && <UserUpdateFrom onComplete={handleCompleteAction} />}
                {isDeletingUser && <UserDeleteForm />}

                <button onClick={() => setIsEditingUser(!isEditingUser)}>
                    {isEditingUser ? 'Cancelar' : 'Editar Usuario'}
                </button>
                <button onClick={() => setIsDeletingUser(!isDeletingUser)}>
                    {isDeletingUser ? 'Cancelar' : 'Eliminar Usuario'}
                </button>
            </>
            }
        </>
    )
    

}

export default Dashboard;