import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReviewItem from "../ReviewItem";
import {findReviewThunk} from "../../services/review-thunks";

const ReviewList = () => {
    const {reivews, loading} = useSelector(state => state.reviewsData)
    const dispath = useDispatch();
    useEffect(() => {
        dispath(findReviewThunk())
    }, [])
    return (
        <ul className="list-group">
            {
                loading &&
                <li className="list-group-item">
                    Loading...
                </li>
            }

            {
                reviews.map(review =>
                              <ReviewItem key={review._id} review={review}/>,

                )
            }



        </ul>

    );
};
export default ReviewList;