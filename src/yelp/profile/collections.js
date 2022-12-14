import {findAllBookmarksByUser} from "../../services/bookmark-service";
import React, {useEffect, useState} from "react";
import {SearchResults} from "../../SearchLandingScreen/SearchResults/SearchResults";



const Collections = (props) => {
    const profileId = props.profileId;
    const userId = props.userId
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
        <div className="mb-5">
            {
                bookmarks && bookmarks.length>0 && <SearchResults businesses={bookmarks} userId={userId} loggedIn={true}/>
            }
            <ul className="list-group mt-3">
            {
                !bookmarks || bookmarks.length === 0 && <li className="list-group-item">No bookmarks right now!</li>
            }
            </ul>

        </div>
    );
};

export default Collections;