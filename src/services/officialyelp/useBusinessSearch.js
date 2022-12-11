import {useState, useEffect} from 'react';
import * as api from './yelp-api';

export function useBusinessSearch(location) {
    const [businesses, setBusinesses] = useState([]);
    const [amountResults, setAmountResults] = useState();
    const [searchParams, setSearchParams] = useState(location);

    useEffect(() => {
        setBusinesses([]);
        const fetchData = async () => {
            try {
                const resp = await api.findBusinesses(searchParams);
                // console.log("rawData: ", rawData);
                // const resp = await rawData.json();
                setBusinesses(resp.businesses);
                setAmountResults(resp.total);
            } catch(e) {
                console.error(e);
            }
        };
        fetchData();
    }, [searchParams]);
    return [businesses, amountResults, searchParams, setSearchParams];
}