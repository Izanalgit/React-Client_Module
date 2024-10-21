import { useState } from "react";
import axios from "axios";

const useFetchPOST = () => {
    const [data, setData] = useState(null);
    const [headers, setHeaders] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    const fetchData = async (url, payload, config = {}) => {
        // if (loading) return;
        setLoading(true); 
        setError(null); 
        
        try {
            const response = await axios.post(url, payload, config);

            setData(response.data); 
            setHeaders(response.headers); 

        } catch (error) {
            const errorMessage = error.response
                ? `STATUS ${error.response.status} : ${error.response.data.messageErr}`
                : "El servidor no responde";
            setError(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, headers, loading, error };
};

export default useFetchPOST;