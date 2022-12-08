import {useDispatch, useSelector} from "react-redux";
import {getProfile, getUserId, isLoggedIn} from "../../redux/selectors";
import * as reviewServices from "../../service/reviewServices";
import * as errorServices from "../../service/errorServices";
import {ADMIN, getDate, goToUserProfile, FOOD_DETAIL_URL, MY, SUPER} from "../../service/utils";
import React, {useEffect, useState} from "react";
import FoodItem from "../FoodItem";
import {useNavigate} from "react-router-dom";


const FoodReviewItem = ({
                             review = {
                                 review: "dummy", postedBy: {username: "bob"}
                             },
                             refresh, hasFoodDetail=false, allowDelete = true, allowLike = true
                         }) => {
    const loggedIn = useSelector(isLoggedIn);
    const dispatch = useDispatch();
    const loggedInUserId = useSelector(getUserId);
    const navigate = useNavigate();
    const profile = useSelector(getProfile);
    let isMyReview = review.postedBy && loggedInUserId ? review.postedBy._id === loggedInUserId : false;
    if (profile && (profile.role === ADMIN || profile.role === SUPER)) {
        isMyReview = true;
    }
    const [liked, setLiked] = useState(false);
    const deleteReview = () => {
        reviewServices.deleteReview(MY, review._id)
            .then(refresh)
            .catch((e) => errorServices.alertError(e, dispatch));
    }
    const likeReview = () => {
        if (!loggedIn) {
            alert("Please login first!");
            return;
        }
        reviewServices.userLikesReview(MY, review._id)
            .then(refresh)
            .catch((e) => errorServices.alertError(e, dispatch));
    }
    const userAlreadyLikesReview = () => {
        if (loggedIn && review._id) {
            reviewServices.findUserLikesReview(MY, review._id)
                .then(res => setLiked(!!res))
                .catch((e) => errorServices.alertError(e, dispatch));
        } else {
            setLiked(false)
        }
    }
    const goToFoodDetails = (food) => {
        navigate(`${FOOD_DETAIL_URL}/${food.id}`);
    }

    useEffect(userAlreadyLikesReview, [dispatch, loggedIn, review]);
    return (
        <div className={"row justify-content-between bg-light border p-0"}>
            <div className="col-12">
                <div className="row p-2">
                    {
                        hasFoodDetail &&
                        <div className={"d-none d-md-block col-md-3 col-lg-2 p-2"}>
                            <FoodItem food={review.food} posterOnClickHandler={goToFoodDetails}/>
                        </div>
                    }
                    <div className="col">
                        <div className={"row m-0 pt-2 pb-2 justify-content-between"}>
                            <h5 className="col p-1">Written by
                                <span role={"button"} className="text-success fw-bold text-decoration-underline ps-1" onClick={() => goToUserProfile(navigate, review.postedBy._id)}>
                                    {review.postedBy && review.postedBy.username}
                                </span> on {getDate(review.postedOn)}
                            </h5>
                            <div className="d-none d-md-block col-2 text-end pe-0">
                                {
                                    isMyReview && allowDelete &&
                                    <button className={"btn btn-danger"}
                                            onClick={deleteReview}>Delete
                                    </button>
                                }
                            </div>
                            <div className="d-block d-md-none col-2 text-end pe-0">
                                {
                                    isMyReview && allowDelete &&
                                    <i role={"button"} className={"fa-solid fa-xmark"} style={{color: "red"}} onClick={deleteReview}/>
                                }
                            </div>
                        </div>
                        <p className="p-1 overflow-hidden">{review.review}</p>
                        <div className={"row m-0 align-items-center"}>
                            <h6 className="col text-muted p-1 ">Rating: {review.rating}/10</h6>
                            <span className={"col-3 col-md-2 col-lg-1"}>
                                <div className={"row align-items-center"}>
                                    {
                                        liked &&
                                        <i className={`col-6 fa-solid fa-bookmark`} onClick={allowLike? likeReview : undefined}/>
                                    }
                                    {
                                        !liked &&
                                        <i className={`col-6 fa-regular fa-bookmark`} onClick={allowLike? likeReview : undefined}/>
                                    }
                                    <span className={"col-6"}>{review.stats && review.stats.likes}</span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default FoodReviewItem;