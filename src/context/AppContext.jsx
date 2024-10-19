import { useContext, createContext, useState, useEffect} from "react";

const AppContext = createContext();

const AppProvaider = ({children}) => {

    const [logedIn, setLogedIn] = useState(false);
    const API = "http://localhost:8080";
    
    //Loged state
    const getLoged = (status) => {
        setLogedIn(status);
        if (status) {
            localStorage.setItem('logedIn', 'true');
        } else {
            localStorage.removeItem('logedIn');
        }
    };

    //Start or Refresh 
    useEffect(() => {
        //Prevail logedIn state
        const haveUserAuth = localStorage.getItem('authToken');
        const isUserLogedIn = localStorage.getItem('logedIn');
        if (isUserLogedIn && haveUserAuth) setLogedIn(true);
    }, []);

    return (
        <AppContext.Provider value={{
            API,
            logedIn,
            getLoged
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useApp = () => useContext(AppContext);

export {AppProvaider, useApp};