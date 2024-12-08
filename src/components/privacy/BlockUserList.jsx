import { useApp } from "../../context/AppContext";

import BlockUserCard from "./BlockUserCard";

import '../../css/BlockCard.css';

const BlockUserList = () => {

    const {userBlocks} = useApp();

    const blockedUsers = userBlocks?.blockedUsers || [];

    return (
        <div className="block-list">
            <h4>Usuarios bloqueados</h4>
            {blockedUsers.length > 0 ? (
                blockedUsers.map((blocked) => (
                    <BlockUserCard 
                        key={blocked._id} 
                        blockedId={blocked._id} 
                        blockedName={blocked.name}
                    />
                ))
            ) : (
                <p>No tienes a nadie bloqueado.</p>
            )}

        </div>
    );

}

export default BlockUserList;