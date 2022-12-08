import FoodReviewItem from "../FoodReviewItem";
import {useEffect} from "react";
import {resetScrollToTop} from "../../service/utils";

const FoodReviews = ({reviews, refresh}) => {
    useEffect(resetScrollToTop, [])
    return (
        <div className={"row m-3"}>
            {
                reviews.map((r, nth) =>
                    <div key={nth + "div"} className={"col-12 p-0"}>
                        <FoodReviewItem key={nth} review={r} refresh={refresh}/>
                    </div>
                )
            }
        </div>
    )
};
export default FoodReviews;