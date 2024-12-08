import { useState } from "react";

import { useApp } from "../context/AppContext";
import wellcomeService from "../services/wellcomeService";
import UserUpdateFrom from "../components/user/UserUpdateFrom";
import UserDeleteForm from "../components/user/UserDeleteForm";
import BlockUserList from "../components/privacy/BlockUserList";
import PremyMenu from "../components/premy/PremyMenu";

import '../css/Dashboard.css';

const Dashboard = () => {

    const [isBuying,setIsBuying] = useState(false);
    const [isEditingUser,setIsEditingUser] = useState(false);
    const [isDeletingUser,setIsDeletingUser] = useState(false);
    const [isManagingBlocks,setIsManagingBlocks] = useState(false);
    

    const {logedIn,userPremy,userProfile} = useApp();

    const wellcomeMessage = wellcomeService(userProfile?.userProfile?.genre) || '';

    const handleCompleteAction = () => {
        setIsEditingUser(false);
    };
    const handleCompleteBuy = () => {
        setIsBuying((prev)=>!prev);
    };

    return (
        
        <div className="dashboard-user">
            {!logedIn && <h5>No estás conectado!</h5>}
            {logedIn &&
            <>
                {!isBuying &&
                    <div className="manage-buttons">
                        <button 
                            onClick={() => setIsEditingUser(!isEditingUser)} 
                            disabled={isDeletingUser || isManagingBlocks}
                        >
                            {isEditingUser ? 'Cancelar' : 'Editar Usuario'}
                        </button>
                        <button 
                            onClick={() => setIsDeletingUser(!isDeletingUser)}
                            disabled={isEditingUser || isManagingBlocks}
                        >
                            {isDeletingUser ? 'Cancelar' : 'Eliminar Usuario'}
                        </button>
                        <button 
                            onClick={() => setIsManagingBlocks(!isManagingBlocks)}
                            disabled={isDeletingUser || isEditingUser}
                        >
                            {isManagingBlocks ? 'Cancelar' : 'Blockeados'}
                        </button>
                    </div>
                }
                <div className="dashboard-content">
                    {!isEditingUser && !isDeletingUser && !isManagingBlocks &&
                        <div>
                            {!isBuying && 
                            <>
                                <h3>CONFIGURACIÓN DE USUARIO :</h3>
                                <p>Hola {logedIn}. {wellcomeMessage}</p>
                            </>
                            }
                            <PremyMenu premium={userPremy} onComplete={handleCompleteBuy}/>
                        </div>
                    }
                    {isEditingUser && <UserUpdateFrom onComplete={handleCompleteAction} />}
                    {isDeletingUser && <UserDeleteForm />}
                    {isManagingBlocks && <BlockUserList />}
                </div>
            </>
            }
        </div>
    )
    

}

export default Dashboard;