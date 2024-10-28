import { useApp } from "../../context/AppContext";

import BlockUserCard from "./BlockUserCard";

const BlockUserList = () => {

    const {userBlocks} = useApp();

    const blockedUsers = userBlocks?.blockedUsers || [];

    return (
        <div>
            <h2>Usuarios bloqueados</h2>
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