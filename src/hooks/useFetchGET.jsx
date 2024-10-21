import { useState } from "react";
import axios from "axios";

const useFetchGET = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const fetchData = async (url,config) => {
        // if (loading) return;
        setLoading(true); 
        setError(null);

        try {
            const response = await axios.get(url,config);
            setData(response.data);

        } catch (error) {
            const errorMessage = error.response
                ? `STATUS ${error.response.status} : ${error.response.data.messageErr}`
                : "El servidor no responde";
            
            setError(errorMessage);

        } finally {
            setLoading(false);
        }
    };


    return { fetchData, data, loading, error };
};

export default useFetchGET;