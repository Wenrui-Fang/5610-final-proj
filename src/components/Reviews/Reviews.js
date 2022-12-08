import ReviewItem from "../../components/Reviews/ReviewItem";
import {useCallback, useEffect, useState} from "react";
import * as reviewServices from "../../service/reviewServices";
import * as errorServices from "../../service/errorServices";

const Reviews = ({uid, allowDelete = true}) => {
    const [reviews, setReviews] = useState([]);
    const findReviews = useCallback( () => {
        if(uid){
            reviewServices.findAllReviewsOwnedByUserWithFoodDetails(uid)
                .then(rs => setReviews(rs))
                .catch(errorServices.alertError);
        }
        }, [uid]);
    useEffect(findReviews, [findReviews]);
    return (
        <div className={"row m-3"}>
            {
                reviews.length > 0 &&
                reviews.map((r, nth) =>
                    <div key={nth + "div"} className={"col-12 p-0"}>
                        <ReviewItem key={nth} review={r} refresh={findReviews} allowDelete={allowDelete}/>
                    </div>
                )
            }
        </div>
    )
};
export default Reviews;