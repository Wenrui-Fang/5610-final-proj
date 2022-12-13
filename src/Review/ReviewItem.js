import React from "react";
import ReviewStats from "./ReviewStats";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {deleteReviewThunk} from "../services/review-thunks";

const ReviewItem = (
    {
        review = { "_id": 123,
            "businessname": "GRANVILLE",
            "userName": "Shannon R.",
            "rating": "4.9",
            "hours": "11 a.m. to 8 p.m. 7 days a week",
            "image": "https://s3-media0.fl.yelpcdn.com/bphoto/3KQX-y1nbWFAr8mt-I9vNg/l.jpg",
            "review": "Great food, great staff, great music!\n" +
                "Sami was amazing, very attentive and her recommendations were great! Definitely will be back! Thanks Granville for the experience"
        }}
) => {
    const reviews = useSelector(state => state.reviews)
    //console.log(tuits)

    const dispatch = useDispatch();
    const deleteReviewHandler = (id) => {
        dispatch(deleteReviewThunk(id));
    }

    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col-2">
                    <img className="rounded-circle" src={require(`https://s3-media0.fl.yelpcdn.com/bphoto/3KQX-y1nbWFAr8mt-I9vNg/l.jpg`)} width="100%"/>
                </div>
                <div className="col-10">
                    <div>
                        <i className="bi bi-x-lg float-end"
                           onClick={() =>deleteReviewHandler(review)}></i>
                        <span>
                        {tuit.userName}
                            <i className="bi bi-check-circle-fill"></i>
                        <span className="text-secondary">
                            {review.handle} {review.time}
                        </span>
                  </span>
                        <div>
                            {review.review}
                        </div>
                    </div>

                    <div>
                        <ReviewStats key={review._id} review={review}/>
                    </div>

                </div>


            </div>

        </li>

    );
};
export default ReviewItem;