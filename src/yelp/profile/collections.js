import {findAllBookmarksByUser} from "../../services/bookmark-service";
import React, {useEffect, useState} from "react";
import {SearchResults} from "../../SearchLandingScreen/SearchResults/SearchResults";



const Collections = (props) => {
    const profileId = props.profileId;
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => await findAllBookmarksByUser(profileId)
                .then(data => setBookmarks(data.businesses))
            let response = fetchData();
        } catch (e) {
            console.log("fetch bookmarks data fail!");
        }
    }, [])

    return (
        <div>
            <SearchResults businesses={bookmarks} loggedIn={true}/>
        </div>
    );
};

export default Collections;