import { useState, useEffect } from "react";

const Home = () => {

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <>
            <h1>LANDING PAGE AQUÍ !</h1>

            <button onClick={toggleTheme}>
                Cambiar a {theme === "light" ? "Oscuro" : "Claro"}
            </button>
        </>
    )
};

export default Home;