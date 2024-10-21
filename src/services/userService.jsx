import useFetchGET from '../hooks/useFetchGET';

const useUserService = (url) => {
    const fetchInstance = useFetchGET(); 

    const getUserBlocks = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        await fetchInstance.fetchData(`${url}/api/privacy/block`, {headers});
        return { 
            data: fetchInstance.data,
            loading: fetchInstance.loading, 
            error: fetchInstance.error 
        };
    };

    const getUserProfile = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        await fetchInstance.fetchData(`${url}/api/profile`, { headers });
        return { 
            data: fetchInstance.data, 
            loading: fetchInstance.loading, 
            error: fetchInstance.error 
        };
    };

    const getUserContacts = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        await fetchInstance.fetchData(`${url}/api/contacts/list`, { headers });
        return { 
            data: fetchInstance.data, 
            loading: fetchInstance.loading, 
            error: fetchInstance.error 
        };
    };

    return {
        getUserProfile,
        getUserContacts,
        getUserBlocks,
    };
};

export default useUserService;