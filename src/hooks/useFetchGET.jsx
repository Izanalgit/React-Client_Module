import { useState, useEffect } from "react";
import axios from "axios";

const useFetchGET = (url,config) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
        try {
            const response = await axios.get(url,config);
            if (isMounted) setData(response.data);

        } catch (error) {
            if (isMounted) {
                const errorMessage = error.response
                    ? `Error ${error.response.status}: ${error.response.data.message}` //messageErr?
                    : "El servidor no responde";
                
                setError(errorMessage);
            }
        } finally {
            if (isMounted) setLoading(false);
        }
        };

        fetchData();

        return () => isMounted = false;

    }, [url]);

    return { data, loading, error };
};

export default useFetchGET;