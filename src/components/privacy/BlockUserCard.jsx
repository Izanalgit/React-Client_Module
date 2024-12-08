import { useState } from "react";

import UnblockUser from "./UnblockUser";
import ReportUser from "./ReportUser";

const BlockUserCard = ({ blockedId, blockedName }) => {

    const [isReporting,setIsReporting] = useState(false);

    const handleButton = () =>{
        setIsReporting(!isReporting)
    }

    return (
        <div className="block-card">
            <h4>{blockedName}</h4>
            
            {isReporting
                ? <ReportUser userId={blockedId} />
                : <UnblockUser userId={blockedId} />
            }

            <button onClick={handleButton} className={isReporting ? "report-button" : ""}>
                {isReporting ? "Cancelar" : "Reportar"}
            </button>
        </div>
    );
};

export default BlockUserCard;