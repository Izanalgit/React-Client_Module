import { useContext, createContext, useState, useEffect } from "react";
import useUserService from "../services/userService";
import usePremyService from "../services/premyService";
import useWebSocket from "../hooks/useWebSocket";

const AppContext = createContext();

const AppProvaider = ({ children }) => {
    const [logedIn, setLogedIn] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [csrfToken, setCsrfToken] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userContacts, setUserContacts] = useState(null);
    const [userBlocks, setUserBlocks] = useState(null);
    const [userPremy, setUserPremy] = useState(null);
    const [userKey, setUserkey] = useState(null);
    const [userPublicKey, setUserPublicKey] = useState(null);
    const [userKeyPass, setUserkeyPass] = useState(null);
    const [wsEvent , setWsEvent] = useState(null);
    const [theme, setTheme] = useState("light");
    const IpAPI = import.meta.env.VITE_API_URL;
    const API = "https://" + IpAPI;

    const { 
        getUserProfile, 
        getUserContacts, 
        getUserBlocks,
        getUserKey,
        getUserCSRF 
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
    const getLoged = (userName, token , userKey, csrf) => {
        setLogedIn(userName);
        setAuthToken(token);
    
        if (userName && token && userKey && csrf) {
            localStorage.setItem("logedIn", userName);
            localStorage.setItem("authToken", token);
            localStorage.setItem("userKey", userKey.rpk);
            localStorage.setItem("userPublicKey", userKey.publicKey);

            setLogedIn(userName);
            setAuthToken(token);
            setCsrfToken(csrf);
            setUserkey(userKey.rpk);
            setUserPublicKey(userKey.publicKey)
            setUserkeyPass({
                rps: userKey.rps,
                riv: userKey.riv,
                rsa: userKey.rsa
            })
        } else {
            localStorage.removeItem("logedIn");
            localStorage.removeItem("authToken");
            localStorage.removeItem("userProfile");
            localStorage.removeItem("userContacts");
            localStorage.removeItem("userBlocks");
            localStorage.removeItem("userPremy");
            localStorage.removeItem("userKey");
            localStorage.removeItem("userPublicKey");
            setLogedIn(null);
            setAuthToken(null);
            setCsrfToken(null);
            setUserProfile(null);
            setUserContacts(null);
            setUserBlocks(null);
            setUserPremy(null);
            setUserkey(null);
            setUserPublicKey(null);
            setUserkeyPass(null);

        }
    };

// User get info from API
const fetchAndStoreUserInfo = async (selector) => {
    if (logedIn && authToken && userKey) {
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
        if(!selector || selector === 'public'){
            const publicKey = await getUserKey(authToken);
            userInfo.publicKey = publicKey.data.soloElPuebloSalvaAlPueblo.publicKey;
        }

        if (
            userInfo.userProfile != null || 
            userInfo.userContacts != null || 
            userInfo.userBlocks != null ||
            userInfo.userPremy != null ||
            userInfo.publicKey != null
        ) {
            if(!selector || selector === 'profile')
                setUserProfile(userInfo.userProfile || null);
            if(!selector || selector === 'contacts')
                setUserContacts(userInfo.userContacts || null);
            if(!selector || selector === 'blocks')
                setUserBlocks(userInfo.userBlocks || null);
            if(!selector || selector === 'premy')
                setUserPremy(userInfo.userPremy || null);
            if(!selector || selector === 'public')
                setUserPublicKey(userInfo.publicKey || null);

            if(!selector || selector === 'profile')
                localStorage.setItem("userProfile", JSON.stringify(userInfo.userProfile || null));
            if(!selector || selector === 'contacts')
                localStorage.setItem("userContacts", JSON.stringify(userInfo.userContacts || null));
            if(!selector || selector === 'blocks')
                localStorage.setItem("userBlocks", JSON.stringify(userInfo.userBlocks || null));
            if(!selector || selector === 'premy')
                localStorage.setItem("userPremy", JSON.stringify(userInfo.userPremy || null));
            if(!selector || selector === 'public')
                localStorage.setItem("userPublicKey", JSON.stringify(userInfo.publicKey || null));
            
        }else {
            //Clean login if not profile get
            setLogedIn(null);
            setAuthToken(null);
            setUserkey(null);
            setUserPublicKey(null);
        }
    }
};

// Get Private Key pass
const getPKS = async () => {

    if(!authToken)
        return

    const {data} = await getUserKey(authToken);

    if(data){
        const SPSP = data.soloElPuebloSalvaAlPueblo
        setUserkeyPass({
            rps: SPSP.rps,
            riv: SPSP.riv,
            rsa: SPSP.rsa
        })
    }
}

// Get CSRF Token
const getCSRF = async () => {

    if(!authToken)
        return

    const {data} = await getUserCSRF(authToken);

    if(data){
        setCsrfToken(data.tokenCSRF)
    }
}

// Start or Refresh
useEffect(() => {
    // Prevail logedIn state and user info
    const haveUserAuth = localStorage.getItem("authToken");
    const haveUseKey = localStorage.getItem("userKey");
    const isUserLogedIn = localStorage.getItem("logedIn");
    const savedTheme = localStorage.getItem("theme");
    if (isUserLogedIn && haveUserAuth && haveUseKey) {
        setLogedIn(isUserLogedIn);
        setAuthToken(haveUserAuth);
        setUserkey(haveUseKey);
        setUserPublicKey(JSON.parse(localStorage.getItem("userPublicKey")));
        setUserProfile(JSON.parse(localStorage.getItem("userProfile")));
        setUserContacts(JSON.parse(localStorage.getItem("userContacts")));
        setUserBlocks(JSON.parse(localStorage.getItem("userBlocks")));
        setUserPremy(JSON.parse(localStorage.getItem("userPremy")));
    }
    if(savedTheme) setTheme(savedTheme);
}, []);

// Fetch User Info when login
useEffect(() => {
    fetchAndStoreUserInfo();
    getPKS();
    getCSRF();
}, [logedIn, authToken ]);

// Websocket
const cleanWsEvent = () => setWsEvent(null);
const getWsEvent = (ws) => setWsEvent(ws);
const { sendMessage } = useWebSocket(IpAPI,authToken,getWsEvent);

useEffect(() => {
    const requestWs = async () =>{
        if (authToken && ['FRIEND_REQUEST','FRIEND_ACCEPT','FRIEND_REMOVED'].includes(wsEvent)){ 
            await fetchAndStoreUserInfo('contacts');
        }
        cleanWsEvent();
    }
    requestWs();
}, [wsEvent]);

// Theme select
const toggleTheme = () => {
    localStorage.setItem("theme", (theme === "light" ? "dark" : "light"));
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
};

useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
}, [theme]);

return (
    <AppContext.Provider
        value={{
            API,
            logedIn,
            authToken,
            csrfToken,
            userProfile,
            userContacts,
            userBlocks,
            userPremy,
            wsEvent,
            userKey,
            userPublicKey,
            userKeyPass,
            theme,
            getLoged,
            changeName,
            fetchAndStoreUserInfo,
            sendMessage,
            cleanWsEvent,
            toggleTheme,
    }}>
        {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export { AppProvaider, useApp };