import { useContext, createContext, useState } from "react";

const AppContext = createContext();

const AppProvaider = ({children}) => {

    const [logedIn, setLogedIn] = useState(false);
    const API = "";


    //Loged check
    const getLoged = (status) => setLogedIn(status);

    return (
        <AppContext.Provider value={{
            logedIn,
            API,
            getLoged
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useApp = () => useContext(AppContext);

export {AppProvaider, useApp};