import useFetchGET from '../hooks/useFetchGET';

const useUserService = (url) => {
    const blocksInstance = useFetchGET();
    const profileInstance = useFetchGET(); 
    const contactsInstance = useFetchGET();  

    const getUserBlocks = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        const blocksData = await blocksInstance.fetchData(`${url}/api/privacy/block`, { headers });
        return { 
            data: blocksData,   // Aquí devolvemos directamente blocksData
            loading: blocksInstance.loading, 
            error: blocksInstance.error 
        };
    };

    const getUserProfile = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        const profileData = await profileInstance.fetchData(`${url}/api/profile`, { headers });
        console.log('SERVICE', profileData);  // Ya debe mostrar la data correctamente
        return { 
            data: profileData,   // Retornamos profileData directamente
            loading: profileInstance.loading, 
            error: profileInstance.error 
        };
    };

    const getUserContacts = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        const contactsData = await contactsInstance.fetchData(`${url}/api/contacts/list`, { headers });
        return { 
            data: contactsData,   // Retornamos contactsData directamente
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