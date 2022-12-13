import React from "react";
import ReviewListItem from "./ReviewListItem";

const ReviewList = ({reviews}) => {

    function comp(a,b) {

        return new Date(b.reviewTime).getTime()-new Date(a.reviewTime).getTime();
    }
    // reviews.sort(comp);

    return (
        <>
            <p className="wd-title wd-gold">Latest Reviews</p>
            <ul className="list-group">
                {
                    reviews.map && reviews.map(review => {return(<ReviewListItem item={review}/>
                );
                })}
            </ul>
        </>
    );
}
export default ReviewList;