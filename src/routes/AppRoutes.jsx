import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/NavBar.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Search from "../pages/Search.jsx";
import Chat from "../pages/Chat.jsx";
import Contact from "../pages/Contact.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Contacts from "../pages/Contacts.jsx";
import Login from "../pages/Login.jsx";
import Logout from "../pages/LogOut.jsx";

const AppRoutes = () =>{
    return(
        <Router>
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/search" element={<Search />} />
                <Route path="/chat/:contactName/:contactId" element={<Chat />} />
                <Route path="/contact/:contactId" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
        </Router>
    );
}

export default AppRoutes;