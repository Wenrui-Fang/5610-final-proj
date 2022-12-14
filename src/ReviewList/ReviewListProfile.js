import React from "react";
import ReviewListItemProfile from "./ReviewListItemProfile";

const ReviewListProfile = ({reviews}) => {

    return (
        <>
            <ul className="list-group mt-3">
                {
                    reviews && reviews.map(review => <ReviewListItemProfile key={review._id} item={review}/>)
                }
                {
                    reviews.length === 0 && <li className="list-group-item">No review right now!</li>
                }
            </ul>
        </>
    );
}
export default ReviewListProfile;