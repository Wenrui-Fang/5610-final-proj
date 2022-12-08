import {FOOD_DETAIL_URL, MY} from "../../service/utils";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import * as reviewServices from "../../service/reviewServices";
import * as errorServices from "../../service/errorServices";

const ReviewItem = ({review, refresh, allowDelete = true}) => {
    const dispatch = useDispatch();
    const loggedInUserId = useSelector(getUserId);
    const isMyReview = review.postedBy && loggedInUserId ? review.postedBy._id === loggedInUserId : false;
    const deleteReview = () => {
        reviewServices.deleteReview(MY, review._id)
            .then((res) => refresh())
            .catch((e) => errorServices.alertError(e, dispatch));

    }
    const navigate = useNavigate();
    const goToFoodDetails = (food) => {
        navigate(`${FOOD_DETAIL_URL}/${food.id}`);
    }
    return (
        <div className={"row justify-content-between bg-light border p-0"}>
            <div className="col-12 bg-light">
                <div className="row p-3">
                    <div className="d-none d-md-block col-md-3 col-lg-2 align-self-start pt-2" onClick={() => goToFoodDetails(review.food)}>
                        <img
                            src={`${review.food && review.food.poster_path ? `${process.env.REACT_APP_FOOD_BASE_URL}/w342/${review.food.poster_path}` : ""}`}
                            className="img-fluid" alt="Poster Not Found"/>
                    </div>
                    <div className="col col-md-9 col-lg-10">
                        <div className={"row m-0 align-self-center justify-content-between"}>
                            <h5 className="col p-0" role={"button"} onClick={() => goToFoodDetails(review.food)}>{review.food && review.food.title}</h5>
                            <div className="col-3 col-md-2 col-lg-1">
                                {
                                    isMyReview && allowDelete &&
                                    <button className={"btn btn-danger"}
                                            onClick={deleteReview}>Delete</button>
                                }
                            </div>
                        </div>
                        <h6 className="text-muted p-0">Rating: {review.rating}/10</h6>
                        <p className=" p-0">{review.review}</p>
                    </div>
                </div>
            </div>
        </div>

    )
};
export default ReviewItem;