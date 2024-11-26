import useFetchGET from '../hooks/useFetchGET';

const usePremyService = (url) => {
    const premyCount = useFetchGET();

    const getPremyCount = async (authToken) => {
        const headers = { Authorization: `${authToken}` };
        const premyData = await premyCount.fetchData(`${url}/api/premy/count`, { headers });
        return { 
            data: premyData,
        };
    };


    return {
        getPremyCount,
    };
};

export default usePremyService;