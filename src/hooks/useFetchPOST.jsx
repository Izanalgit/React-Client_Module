import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPOST = (url, payload, config = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!payload) {
            setError("Payload no provisto");
            setLoading(false);
            return;
        }

        let isMounted = true;

        const fetchData = async () => {
        try {
            const response = await axios.post(url, payload, config);
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

    }, [url, config, payload]);

    return { data, loading, error };
};

export default useFetchPOST;