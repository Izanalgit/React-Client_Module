import { useState , useEffect } from "react";

import { useApp } from "../context/AppContext";
import useFetchPOST from "../hooks/useFetchPOST";

import SearchProfilesForm from "../components/search/SearchProfilesForm";
import SearchProfilesList from "../components/search/SearchProfilesList";

import '../css/SearchContent.css'

const Search = () => {

    const { API, authToken, logedIn ,userProfile} = useApp();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [basicFilters, setBasicFilters] = useState({});
    const [extendedFilters, setExtendedFilters] = useState({});
    const [goSearch, setGoSearch] = useState(false);
    const [searchDone, setSearchDone] = useState(false);
    const [profiles, setProfiles] = useState([]);

    const { 
        data: profilesSearchData,
        loading: profilesSearchLoading, 
        error: profilesSearchError, 
        fetchData: searchProfiles
    } = useFetchPOST();

    const searchWithFilter = () => setGoSearch(true);
    const searchAgain = () => setSearchDone(false);

    const getFilters = (basicFilters, advancedFilters) => {
        setBasicFilters({...basicFilters});
        setExtendedFilters({...advancedFilters});
        setSearchDone(true);
    }

    // Search fetch
    const search = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (isUpdating || !authToken) return;

        try {
            setIsUpdating(true);
            const headers = { Authorization: `${authToken}` };
            await searchProfiles(
                `${API}/api/contacts/search`, 
                {payload:{ normalSearch :basicFilters , expandedSearch:extendedFilters }},
                {headers}
            );

        } catch (err) {
            setErrorMessage('Error al realizar la busqueda de perfiles. Intenta de nuevo.');
            console.log(err , profilesSearchError)
        } finally {
            setIsUpdating(false);
        }
    };

    //Default search
    useEffect(()=>{
        if(authToken)
            search();
    },[authToken])

    //Filtered search
    useEffect(()=>{
        if(basicFilters)
            search();
    },[basicFilters,extendedFilters])

    //Set filters
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
                :<div className="search-content">
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>} 

                    {goSearch
                        ?<>
                            {searchDone  
                                ?<>
                                    <button 
                                        onClick={searchAgain}
                                        className="filter-button"
                                    >FILTRAR</button>
                                    <SearchProfilesList profiles={profiles} />
                                </>
                                : <SearchProfilesForm onSearch={getFilters} />
                            }
                        </>
                        :<>
                            <button 
                                onClick={searchWithFilter}
                                className="filter-button"
                            >FILTRAR</button>
                            <SearchProfilesList profiles={profiles} />
                        </>
                    }
                    
                </div>
            }
        </>}
    </>)
    

}

export default Search;