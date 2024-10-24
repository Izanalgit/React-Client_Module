import { useState } from "react";
import axios from "axios";

const useFetchGET = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    const fetchData = async (url, config) => {
        setLoading(true); 
        setError(null);

        try {
            const response = await axios.get(url, config);
            setData(response.data);
            return response.data; 

        } catch (error) {
            const errorMessage = error.response
                ? `STATUS ${error.response.status} : ${error.response.data.messageErr}`
                : "El servidor no responde";
            
            setError(errorMessage);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, loading, error };
};

export default useFetchGET;