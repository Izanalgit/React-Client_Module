import { useState , useEffect } from "react";

import { useApp } from "../context/AppContext";
import useFetchPOST from "../hooks/useFetchPOST";

import SearchProfilesForm from "../components/search/SearchProfilesForm";
import SearchProfilesList from "../components/search/SearchProfilesList";

const Search = () => {

    const { API, authToken, logedIn ,userProfile} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [basicFilters, setBasicFilters] = useState({});
    const [extendedFilters, setExtendedFilters] = useState({});
    const [searchDone, setSearchDone] = useState(false);
    const [profiles, setProfiles] = useState([]);

    const { 
        data: profilesSearchData,
        loading: profilesSearchLoading, 
        error: profilesSearchError, 
        fetchData: searchProfiles
    } = useFetchPOST();

    const getFilters = (basicFilters, advancedFilters) => {
        setBasicFilters({...basicFilters});
        setExtendedFilters({...advancedFilters});
        setSearchDone(true);
    }

    useEffect(()=>{
        const search = async () => {
            setErrorMessage('');
            setSuccessMessage('');
    
            if (!basicFilters) {
                setErrorMessage('Filtros básicos necesarios.');
                return;
            }
    
            if (isUpdating) return;
    
            try {
                setIsUpdating(true);
                const headers = { Authorization: `${authToken}` };
                await searchProfiles(
                    `${API}/api/contacts/search`, 
                    {payload:{ normalSearch :basicFilters, expandedSearch:extendedFilters}},
                    {headers}
                );
    
            } catch (err) {
                setErrorMessage('Error al realizar la busqueda de perfiles. Intenta de nuevo.');
                console.log(err , profilesSearchError)
            } finally {
                setIsUpdating(false);
            }
        };

        search();
        
    },[basicFilters,extendedFilters])

    useEffect(()=>{
        if(!profilesSearchLoading && profilesSearchData && !profilesSearchError)
            setProfiles(profilesSearchData.profiles);

    },[profilesSearchData,profilesSearchLoading])

    return (
    <>
        {!logedIn && <h5>No estás conectado!</h5>}
        {logedIn &&
        <>
            {userProfile?.userProfile?.special?.length < 1
                ? <p>Debes rellenar tu perfil primero.</p>
                :<>
                    <h1>BUSQUEDA DE CONTACTOS:</h1>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>} 

                    {searchDone  
                        ?<SearchProfilesList profiles={profiles} /> 
                        :<SearchProfilesForm onSearch={getFilters} />
                    }
                </>
            }
        </>}
    </>)
    

}

export default Search;