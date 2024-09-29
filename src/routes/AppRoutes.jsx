import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import NavBar from "../components/NavBar";
import Home from "../pages/Home.jsx";

const AppRoutes = () =>{
    return(
        <Router>
        <>
            {/* <NavBar /> */}
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
        </Router>
    );
}

export default AppRoutes;