import UnblockUser from "./UnblockUser";
import ReportUser from "./ReportUser";

const BlockUserCard = ({ blockedId, blockedName }) => {

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h4>{blockedName}</h4>
            <UnblockUser userId={blockedId} />
            <ReportUser userId={blockedId} />
        </div>
    );
};

export default BlockUserCard;