import { useState , useEffect } from "react";
import axios from "axios";

const useFetchPUT = (url,payload) => {
    
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
   
    useEffect(()=>{

        if(payload)
            axios.put(url,payload)
                .then((response) => {
                    setData(response);
                })
                .catch((error) => {
                    if (error.response) {
                        if(error.response.data.errors)
                            setErrMsg(error.response.data.errors);
                        else
                            setErrMsg(`Error ${error.response.status} : ${error.response.data.message}`);
                    } else if (error.request) {
                        setErrMsg(`No responde`);
                        console.log(error.request);
                    } else {
                        setErrMsg(`Error desconocido`);
                        console.log(error.message);
                    }
                })
                .finally(() => {
                    setStatus(true);
                })

    },[url,payload]);


    return {data,status,errMsg};

}

export default useFetchPUT;