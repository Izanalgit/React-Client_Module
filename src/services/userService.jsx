import useFetchGET from '../hooks/useFetchGET';

const useUserService = (url) => {
    const blocksInstance = useFetchGET();
    const profileInstance = useFetchGET(); 
    const contactsInstance = useFetchGET();  

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

    return {
        getUserProfile,
        getUserContacts,
        getUserBlocks,
    };
};

export default useUserService;