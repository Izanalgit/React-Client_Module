import { useState ,useEffect } from "react";

import { useApp } from "../../context/AppContext";
import useFetchPOST from "../../hooks/useFetchPOST";

import '../../css/FormReport.css'

const ReportUser = ({userId}) => {

    const {API,authToken} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const [reportMesage, setReportMesage] = useState('');

    const { 
        data: reportUserData,
        loading: reportUserLoading, 
        error: reportUserError, 
        fetchData: reportUser
    } = useFetchPOST();

    const handleMesageChange = (e) => {
        const {value} = e.target;
        setReportMesage(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (isUpdating) return;

        if (!reportMesage) {
            setErrorMessage('Debes escribir porque reportas al usuario.');
            return;
        }

        try {
            setIsUpdating(true);

            const headers = { Authorization: `${authToken}` };
            const payload = {reportUser:userId , problem:reportMesage};
            await reportUser(
                `${API}/api/privacy/report`, 
                {payload},
                {headers}
            );
            
        } catch (err) {
            setErrorMessage("Error inesperado al reportar usuario.");
            console.error(err, reportUserError);
        }
    }

    useEffect(()=>{
        const report = async()=>{
            if(reportUserData && !reportUserLoading){
                    console.log(reportUserData.message)
                    setSuccessMessage("Usuario reportado con éxito.");
            }
            if (reportUserError && !reportUserLoading) {
                console.log(reportUserError)
                setErrorMessage("Hubo un error al reportar usuario.");
            }
            setIsUpdating(false);
        }

        report();
    },[reportUserData, reportUserLoading, reportUserError])

    return (
        <form onSubmit={handleSubmit} className="report-form">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>} 
            
            <label htmlFor="reportText">Reportar usuario :</label>
            <textarea
                id="reportText"
                name="reportText"
                onChange={handleMesageChange}
                placeholder="Escribe que ha ocurrido..."
            />

            {!reportUserLoading &&
                <button type="submit">Reportar</button>
            }
        </form>

    );

}

export default ReportUser;