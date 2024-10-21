import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../context/AppContext"; 
import useFetchPOST from "../hooks/useFetchPOST";

const LoginComponent = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { API, logedIn, getLoged, fetchUserInfo } = useApp();
    const { 
        data: loginData,
        headers: loginHeaders,
        loading: loginLoading, 
        error: loginError, 
        fetchData: loginUser
    } = useFetchPOST();

    const handleLogin = async (event) => {
        event.preventDefault();

        await loginUser(
            `${API}/api/user/login`, 
            {payload:{ email:email, pswd:password }}
        );
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (loginData?.user && loginHeaders['authorization'] && !logedIn) {
                await getLoged(loginData.user, loginHeaders['authorization']);
                await fetchUserInfo();
                console.log(loginData.message);
                navigate('/');
            }
        };
        fetchUser();
    }, [loginData, loginHeaders, logedIn, getLoged, fetchUserInfo]);

    return (
        <> 
            {logedIn && <h5>Ya estás conectado!</h5>}
            {!logedIn &&
                <div>
                    <h2>Iniciar Sesión</h2>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button type="submit">Login</button>

                        {loginLoading && <p>Cargando...</p>}
                    </form>
                </div>
            }
        </>
    );
};

export default LoginComponent;