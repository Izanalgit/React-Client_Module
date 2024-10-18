import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/NavBar.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Search from "../pages/Search.jsx";
import Chat from "../pages/Chat.jsx";
import Registation from "../pages/Registation.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";

const AppRoutes = () =>{
    return(
        <Router>
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contacts" element={<Search />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/registation" element={<Registation />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
        </Router>
    );
}

export default AppRoutes;