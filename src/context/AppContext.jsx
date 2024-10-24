import { useContext, createContext, useState, useEffect } from "react";
import useUserService from "../services/userService";

const AppContext = createContext();

const AppProvaider = ({ children }) => {
    const [logedIn, setLogedIn] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userContacts, setUserContacts] = useState(null);
    const [userBlocks, setUserBlocks] = useState(null);
    const API = "http://localhost:8080";

    const { 
        getUserProfile, 
        getUserContacts, 
        getUserBlocks 
    } = useUserService(API);

    // Loged state
    const getLoged = (userName, token) => {
        setLogedIn(userName);
        setAuthToken(token);
    
        if (userName && token) {
            localStorage.setItem("logedIn", userName);
            localStorage.setItem("authToken", token);

            setLogedIn(userName);
            setAuthToken(token);
        } else {
            localStorage.removeItem("logedIn");
            localStorage.removeItem("authToken");
            localStorage.removeItem("userProfile");
            localStorage.removeItem("userContacts");
            localStorage.removeItem("userBlocks");
            setLogedIn(null);
            setAuthToken(null);
            setUserProfile(null);
            setUserContacts(null);
            setUserBlocks(null);

        }
    };

// User get info from API
const fetchAndStoreUserInfo = async () => {
    if (logedIn && authToken) {
        const userInfo = {};

        const profile = await getUserProfile(authToken);
        userInfo.userProfile = profile.data;

        const contacts = await getUserContacts(authToken);
        userInfo.userContacts = contacts.data;

        const blocks = await getUserBlocks(authToken);
        userInfo.userBlocks = blocks.data;

        if (userInfo) {
            setUserProfile(userInfo.userProfile || null);
            setUserContacts(userInfo.userContacts || null);
            setUserBlocks(userInfo.userBlocks || null);

            localStorage.setItem("userProfile", JSON.stringify(userInfo.userProfile || null));
            localStorage.setItem("userContacts", JSON.stringify(userInfo.userContacts || null));
            localStorage.setItem("userBlocks", JSON.stringify(userInfo.userBlocks || null));

            console.log("CONTEXT", userInfo);
        }
    }
};

// Start or Refresh
useEffect(() => {
    // Prevail logedIn state and user info
    const haveUserAuth = localStorage.getItem("authToken");
    const isUserLogedIn = localStorage.getItem("logedIn");
    if (isUserLogedIn && haveUserAuth) {
        setLogedIn(isUserLogedIn);
        setAuthToken(haveUserAuth);
        setUserProfile(JSON.parse(localStorage.getItem("userProfile")));
        setUserContacts(JSON.parse(localStorage.getItem("userContacts")));
        setUserBlocks(JSON.parse(localStorage.getItem("userBlocks")));
    }
}, []);
// Fetch User Info when login
useEffect(() => {
    fetchAndStoreUserInfo();
}, [logedIn, authToken]);

return (
    <AppContext.Provider
        value={{
            API,
            logedIn,
            authToken,
            userProfile,
            userContacts,
            userBlocks,
            getLoged,
            fetchAndStoreUserInfo,
    }}>
        {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export { AppProvaider, useApp };