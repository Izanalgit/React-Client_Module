import useFetchGET from '../hooks/useFetchGET';

const useUserService = (url) => {
    const blocksInstance = useFetchGET();
    const profileInstance = useFetchGET(); 
    const contactsInstance = useFetchGET();
    const keyInstance = useFetchGET();
    const csrfInstance = useFetchGET();   

    const getUserBlocks = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        const blocksData = await blocksInstance.fetchData(`${url}/api/privacy/block`, { headers });
        return { 
            data: blocksData,
            loading: blocksInstance.loading, 
            error: blocksInstance.error 
        };
    };

    const getUserProfile = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        const profileData = await profileInstance.fetchData(`${url}/api/profile`, { headers });
        return { 
            data: profileData,
            loading: profileInstance.loading, 
            error: profileInstance.error 
        };
    };

    const getUserContacts = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        const contactsData = await contactsInstance.fetchData(`${url}/api/contacts/list`, { headers });
        return { 
            data: contactsData,
            loading: contactsInstance.loading, 
            error: contactsInstance.error 
        };
    };

    const getUserKey = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        const keyData = await keyInstance.fetchData(`${url}/api/user/rekey`, { headers });
        return { 
            data: keyData
        };
    };

    const getUserCSRF = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        const csrf = await csrfInstance.fetchData(`${url}/api/user/csrf`, { headers });
        return { 
            data: csrf
        };
    };

    return {
        getUserProfile,
        getUserContacts,
        getUserBlocks,
        getUserKey,
        getUserCSRF,
    };
};

export default useUserService;