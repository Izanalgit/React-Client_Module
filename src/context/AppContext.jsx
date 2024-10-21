import { useContext, createContext, useState, useEffect } from "react";
import useUserService from "../services/userService";

const AppContext = createContext();

const AppProvaider = ({ children }) => {
    const [logedIn, setLogedIn] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [userProfile, setUserProfile] = useState({});
    const [userContacts, setUserContacts] = useState([]);
    const [userBlocks, setUserBlocks] = useState([]);
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
        } else {
            localStorage.removeItem("logedIn");
            localStorage.removeItem("authToken");
            localStorage.removeItem("userProfile");
            localStorage.removeItem("userContacts");
            localStorage.removeItem("userBlocks");
        }
    };

// User get info from API
const fetchUserInfo = async() => {
    const authToken = localStorage.getItem("authToken");

    try {
        const profileData = await getUserProfile(authToken);
        const contactsData = await getUserContacts(authToken);
        const blocksData = await getUserBlocks(authToken);

        setUserProfile(profileData.data);
        setUserContacts(contactsData.data);
        setUserBlocks(blocksData.data);

        localStorage.setItem("userProfile", JSON.stringify(profileData.data));
        localStorage.setItem("userContacts", JSON.stringify(contactsData.data));
        localStorage.setItem("userBlocks", JSON.stringify(blocksData.data));
    } catch (error) {
        console.error("Error fetching user info:", error);
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
            fetchUserInfo,
    }}>
        {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export { AppProvaider, useApp };