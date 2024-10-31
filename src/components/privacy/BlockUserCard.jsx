import { useState } from "react";

import UnblockUser from "./UnblockUser";
import ReportUser from "./ReportUser";

const BlockUserCard = ({ blockedId, blockedName }) => {

    const [isReporting,setIsReporting] = useState(false);

    const handleButton = () =>{
        setIsReporting(!isReporting)
    }

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h4>{blockedName}</h4>
            
            {isReporting
                ? <ReportUser userId={blockedId} />
                : <UnblockUser userId={blockedId} />
            }

            <button onClick={handleButton} >
                {isReporting ? "Cancelar" : "Reportar"}
            </button>
        </div>
    );
};

export default BlockUserCard;