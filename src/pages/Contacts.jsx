import { useApp } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

import ContactList from "../components/contacts/ContactsList";

const Contacts = () => {

    // const navigate = useNavigate();
    const {logedIn} = useApp();

    // const handleButton = () => {
    //     navigate('/search');
    // }

    return (
    <>
        {!logedIn && <h5>No estás conectado!</h5>}
        {logedIn &&
            <>
                <ContactList />
                {/* <button onClick={handleButton}>Buscar</button> */}
            </>
        }
    </>)
    

}

export default Contacts;