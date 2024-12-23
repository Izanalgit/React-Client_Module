import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../context/AppContext"; 
import useFetchPOST from "../hooks/useFetchPOST";

import UserRegistForm from "../components/user/UserRegistForm";
import UserRecoverFrom from "../components/user/UserRecoverForm";

import Loader from "../components/popups/Loader";
import Notification from "../components/popups/Notification";

import '../css/LogIn.css';
import '../css/FormsUser.css';

const LoginComponent = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSingUp, setIsSingUp] = useState(false);
    const [isRecovering, setIsRecovering] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { API, logedIn, getLoged } = useApp();
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
                await getLoged(
                    loginData.user, 
                    loginHeaders['authorization'],
                    loginData.soloElPuebloSalvaAlPueblo,
                    loginData.tokenCSRF
                );
                console.log(loginData.message);
                navigate('/');
            }
        };
        fetchUser();
    }, [loginData, loginHeaders, logedIn, getLoged]);

    //Error handling
    useEffect(()=>{
        if(loginError){
            if (loginError.includes("STATUS 401")) 
                setErrorMessage("Credenciales incorrectas, revisa el correo y la contraseña ...");
            if (loginError.includes("STATUS 409"))
                setErrorMessage("Ya estás conectado ...");
            if (loginError.includes("STATUS 500"))
                setErrorMessage("Ups, parece que hay un error con el servidor ...");
        }
    },[loginError])

    return (
        <> 
            {logedIn && <h5>Ya estás conectado!</h5>}
            {!logedIn && isSingUp && <UserRegistForm />}
            {!logedIn && isRecovering && <UserRecoverFrom userEmailLogIn={email}/>}
            {!logedIn && !isSingUp && !isRecovering &&
                <div className="login-form">
                    <h2>Iniciar Sesión</h2>
                    {errorMessage && 
                        <Notification   
                            type={'error'} 
                            message={errorMessage} 
                            onClose={()=>setErrorMessage(null)}
                        />
                    }
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
                        <button onClick={()=>setIsSingUp(true)}>Registrarse</button>
                        <p onClick={()=>setIsRecovering(true)}>He olvidado la contraseña ...</p>

                        {loginLoading && <Loader />}
                    </form>
                </div>
            }
        </>
    );
};

export default LoginComponent;