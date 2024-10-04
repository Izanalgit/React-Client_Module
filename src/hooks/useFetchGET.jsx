import { useState , useEffect } from "react";
import axios from "axios";

//REVIEW 

const useFetchGET = (url) => {
    
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
   
    useEffect(()=>{

        axios.get(url)
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                if (error.response) {
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

    },[url]);


    return {data,status,errMsg};

}

export default useFetchGET;