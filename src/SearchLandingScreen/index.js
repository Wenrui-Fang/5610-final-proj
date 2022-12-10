import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { SearchResults } from './SearchResults/SearchResults';
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useBusinessSearch } from '../services/officialyelp/useBusinessSearch';

const SearchComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    // const term = params.get('find_desc');
    const locationParam = params.get('find_loc');
    const [businesses, amountResults, searchParams, performSearch] = useBusinessSearch(locationParam);

    function search(location) {
        performSearch(location);
    }

    return (
        <div>
            <SearchBar location={locationParam} search={search}/>
            <SearchResults businesses={businesses}/>
        </div>
    );
};
export default SearchComponent;