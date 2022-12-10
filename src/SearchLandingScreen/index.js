import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { SearchResults } from './SearchResults/SearchResults';
import { useLocation } from "react-router";
import { useBusinessSearch } from '../services/officialyelp/useBusinessSearch';

const SearchComponent = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const locationParam = params.get('find_loc');
    const [businesses, amountResults, searchParams, performSearch] = useBusinessSearch(locationParam);

    // When path is plain simple '/search', show the search input and a message to user.
    if (!locationParam) {
        return (
            <div>
                <SearchBar location={locationParam} search={search}/>
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <h3>Please search the location you like</h3>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
        );

    }

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