import React, {useEffect, useState} from "react";
import ReviewItemAdmin from "./ReviewListItemAdmin";
import * as reviewService from "../services/ReviewService";

const ReviewListAdmin = () => {
    const [reviews, setReviews] = useState([]);

    function comp(a, b) {
        return new Date(b.reviewTime).getTime() - new Date(a.reviewTime).getTime();
    }

    // var latest = reviews.slice(0,4);

    useEffect(() => {
        async function findAllReviews() {
            const reviews = await reviewService.findReviews().then(reviews => setReviews((reviews.sort(comp))));
        }
        let review = findAllReviews();
    },[]);


    const refreshReviews = async () => {
        let reviews = await reviewService.findReviews();
        reviews.sort(comp);
        setReviews(reviews);
    }

    const deleteReview = async (rid) => {
        await reviewService.deleteReview(rid).then(refreshReviews);
    }


    return (
        <>
            <p className="wd-title wd-gold">All Reviews posted by users</p>
            <ul className="list-group">
                {
                    reviews && reviews.map(review => <ReviewItemAdmin key={review._id} item={review} deleteReview={deleteReview}/>)
                }
                {
                    reviews.length === 0 && <li className="list-group-item">No review right now!</li>
                }
            </ul>
        </>
    );
}
export default ReviewListAdmin;