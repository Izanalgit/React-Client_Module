import { useContext, createContext, useState, useEffect } from "react";
import useUserService from "../services/userService";
import usePremyService from "../services/premyService";
import useWebSocket from "../hooks/useWebSocket";

const AppContext = createContext();

const AppProvaider = ({ children }) => {
    const [logedIn, setLogedIn] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userContacts, setUserContacts] = useState(null);
    const [userBlocks, setUserBlocks] = useState(null);
    const [userPremy, setUserPremy] = useState(null);
    const [wsEvent , setWsEvent] = useState(null);
    const IpAPI = import.meta.env.VITE_API_URL;
    const API = "http://" + IpAPI;

    const { 
        getUserProfile, 
        getUserContacts, 
        getUserBlocks 
    } = useUserService(API);

    const {
        getPremyCount
    } = usePremyService(API);

    //Change Name
    const changeName = (newName) => {
        if(newName){
            setLogedIn(newName);
            localStorage.setItem("logedIn", newName);
        }
    }

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
            localStorage.removeItem("userPremy");
            setLogedIn(null);
            setAuthToken(null);
            setUserProfile(null);
            setUserContacts(null);
            setUserBlocks(null);
            setUserPremy(null);

        }
    };

// User get info from API
const fetchAndStoreUserInfo = async (selector) => {
    if (logedIn && authToken) {
        const userInfo = {};

        if(!selector || selector === 'profile'){
            const profile = await getUserProfile(authToken);
            userInfo.userProfile = profile.data;
        }
        if(!selector || selector === 'contacts'){
            const contacts = await getUserContacts(authToken);
            userInfo.userContacts = contacts.data;
        }
        if(!selector || selector === 'blocks'){
            const blocks = await getUserBlocks(authToken);
            userInfo.userBlocks = blocks.data;
        }
        if(!selector || selector === 'premy'){
            const premy = await getPremyCount(authToken);
            userInfo.userPremy = premy.data;
        }

        if (
            userInfo.userProfile != null || 
            userInfo.userContacts != null || 
            userInfo.userBlocks != null ||
            userInfo.userPremy != null
        ) {
            if(!selector || selector === 'profile')
                setUserProfile(userInfo.userProfile || null);
            if(!selector || selector === 'contacts')
                setUserContacts(userInfo.userContacts || null);
            if(!selector || selector === 'blocks')
                setUserBlocks(userInfo.userBlocks || null);
            if(!selector || selector === 'premy')
                setUserPremy(userInfo.userPremy || null);

            if(!selector || selector === 'profile')
                localStorage.setItem("userProfile", JSON.stringify(userInfo.userProfile || null));
            if(!selector || selector === 'contacts')
                localStorage.setItem("userContacts", JSON.stringify(userInfo.userContacts || null));
            if(!selector || selector === 'blocks')
                localStorage.setItem("userBlocks", JSON.stringify(userInfo.userBlocks || null));
            if(!selector || selector === 'premy')
                localStorage.setItem("userPremy", JSON.stringify(userInfo.userPremy || null));
            
        }else {
            //Clean login if not profile get
            setLogedIn(null);
            setAuthToken(null);
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
        setUserPremy(JSON.parse(localStorage.getItem("userPremy")));
    }
}, []);

// Fetch User Info when login
useEffect(() => {
    fetchAndStoreUserInfo();
}, [logedIn, authToken]);

// Websocket
const cleanWsEvent = () => setWsEvent(null);
const getWsEvent = (ws) => setWsEvent(ws);
const { sendMessage } = useWebSocket(IpAPI,authToken,getWsEvent);

return (
    <AppContext.Provider
        value={{
            API,
            logedIn,
            authToken,
            userProfile,
            userContacts,
            userBlocks,
            userPremy,
            wsEvent,
            getLoged,
            changeName,
            fetchAndStoreUserInfo,
            sendMessage,
            cleanWsEvent,
    }}>
        {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export { AppProvaider, useApp };