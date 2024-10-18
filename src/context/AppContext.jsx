import { useContext, createContext, useState } from "react";

const AppContext = createContext();

const AppProvaider = ({children}) => {

    const API = "http://localhost:8080";


    return (
        <AppContext.Provider value={{
            API
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useApp = () => useContext(AppContext);

export {AppProvaider, useApp};