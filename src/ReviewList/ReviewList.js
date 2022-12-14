import React from "react";
import ReviewListItem from "./ReviewListItem";

const ReviewList = ({reviews}) => {
    return (
        <>
            <p className="fw-bold wd-review-title">Latest Reviews</p>
            <ul className="list-group mb-5">
                {
                    reviews&&reviews.map(review => <ReviewListItem key={review._id} item={review}/>)
                }
                {
                    reviews.length===0 && <li className="list-group-item">No review right now!</li>
                }
            </ul>
        </>
    );
}
export default ReviewList;