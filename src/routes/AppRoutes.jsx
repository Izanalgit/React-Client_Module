import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/NavBar.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Search from "../pages/Search.jsx";
import Chat from "../pages/Chat.jsx";

const AppRoutes = () =>{
    return(
        <Router>
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contacts" element={<Search />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </>
        </Router>
    );
}

export default AppRoutes;