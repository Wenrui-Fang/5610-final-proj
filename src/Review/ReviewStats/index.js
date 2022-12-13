import React from "react";
import {useDispatch} from "react-redux";
import {updateReviewThunk} from "../../services/review-thunks";

const ReviewStats = (
    {
        review = { "_id": 123,
            "businessname": "GRANVILLE",
            "userName": "Shannon R.",
            "rating": "4.9",
            "hours": "11 a.m. to 8 p.m. 7 days a week",
            "image": "https://s3-media0.fl.yelpcdn.com/bphoto/3KQX-y1nbWFAr8mt-I9vNg/l.jpg",
            "review": "Great food, great staff, great music!\n" +
                "Sami was amazing, very attentive and her recommendations were great! Definitely will be back! Thanks Granvillefor the experience"

        }}
) => {

    const dispatch = useDispatch();
    const updateReviewHandler = (review) =>{
        dispatch(updateReviewThunk(review))
    }


    return(
        <div className="row">
            <ul className="nav mb-2 ">
                {/*//tab*/}
                <li className="nav-item col-3">
                    <a className="nav-link text-secondary" href="src/Review/ReviewStats/index#">
                        <i className="bi bi-chat"></i> {review.replies}
                    </a>
                </li>
                <li className="nav-item col-3">
                    <a className="nav-link text-secondary" href="src/Review/ReviewStats/index#">
                        <i className="bi bi-reply"></i>
                        {review.replies}
                    </a>
                </li>
                <li className="nav-item col-3">

                    <a className="nav-link text-secondary fg-color-red">
                        <i className={review.liked? `bi bi-heart-fill ` : `bi bi-heart`} style={review.liked? {color:"red"}: {color:""}}
                           onClick={() => updateReviewHandler({
                               ...review,
                               likes: review.likes + 1})}>
                            {review.likes}
                        </i>

                    </a>
                </li>
                <li className="nav-item col-3">
                    <a className="nav-link text-secondary" href="src/Review/ReviewStats/index#">
                        <i className="bi bi-share"></i>
                    </a>
                </li>
            </ul>
        </div>

    );


}; export default ReviewStats;