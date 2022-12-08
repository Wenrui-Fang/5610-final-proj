import {useNavigate, useParams} from "react-router-dom";
import * as foodServices from "../service/foodServices";
import * as reviewServices from "../service/reviewServices";
import * as errorServices from "../service/errorServices";
import {useCallback, useEffect, useState} from "react";
import FoodItem from "../components/FoodItem";
import FoodReviews from "../components/FoodReviews";
import CreateReview from "../components/CreateReview";
import FoodGallery from "../components/FoodGallery";
import {FOOD_DETAIL_URL} from "../service/utils";

const FoodDetailsScreen = () => {
    const params = useParams();
    const foodId = params.mid;
    const navigate = useNavigate();
    const [food, setFood] = useState({});
    const [credits, setCredits] = useState({});
    const [reviews, setReviews] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const findFoodCredits = useCallback(
        () => {
            foodServices.findFoodCredits(foodId)
                .then(c => setCredits(c))
                .catch(errorServices.alertError);
        }, [foodId]
    )
    const findRecommendations = useCallback(
        () => {
            foodServices.getRecommendationsByFood(foodId, 1)
                .then(ms => setRecommendations(ms.slice(0, 5)))
                .catch(errorServices.alertError);
        }, [foodId]
    )
    const findFood = useCallback(
        () => {
            foodServices.findFoodDetail(foodId)
                .then((m) => setFood(m))
                .catch(errorServices.alertError)
        }, [foodId]
    )
    const findReviews = useCallback(
        () => {
            reviewServices.findAllReviewsOfFood(foodId)
                .then(rs => setReviews(rs.slice(0,3)))
                .catch(errorServices.alertError)
        }, [foodId]
    )
    const findInfo = useCallback(
        async () => {
            await findFood();
            await findFoodCredits();
            await findReviews();
            await findRecommendations();
        }, [findFood, findFoodCredits, findRecommendations, findReviews]
    )
    const goToFoodReviews = () => {
        navigate(`/food/${foodId}/reviews`);
    }
    const goToRecommendations = () => {
        navigate(`/food/${foodId}/recommendations`);
    }
    const sortFoodTypeByPopularity = (type) => {
        type = type.sort((a, b) => b.popularity - a.popularity)
        type = [...new Set(type.map(c => c.name))]
        return type.slice(0, 20);
    }
    useEffect(findInfo, [findInfo])
    return (
        <div className={"row justify-content-between p-3"}>
            <div className={"col-8 col-md-6 col-lg-3"}>
                {
                    food &&
                    <FoodItem allowLike={true} food={food} posterOnClickHandler={() => {}}/>
                }
            </div>
            <div className="col-12 col-lg-9 ps-4">
                <div className={"pt-4 pb-4"}>
                    <h3>Overview</h3>
                    <div className={"pt-2 pb-2 text-secondary"}>
                        {food.overview}
                    </div>
                </div>
                <div className={"pb-4"}>
                    <h3>Name</h3>
                    <div className={"pt-2 pb-2 text-secondary d-flex align-items-center"} style={{overflowX: "auto", whiteSpace: "nowrap"}}>
                        {
                            credits.name &&
                            credits.name.slice(0, 20).map((c, nth) => <div key={nth} className={"pe-4 fs-6"}>{c.name} </div>)
                        }
                    </div>
                </div>
                <div className={"pb-4"}>
                    <h3>Type</h3>
                    <div className={"pt-2 pb-2 text-secondary d-flex align-items-center"} style={{overflowX: "auto", whiteSpace: "nowrap"}}>
                        {
                            credits.type &&
                            sortFoodTypeByPopularity(credits.crew).map((c, nth) => <div key={nth} className={"pe-4 fs-6"}>{c} </div>)
                        }
                    </div>
                </div>
                <div className={"bg-light border p-2"}>
                    <div className={'m-3'}>
                        <div className={"row align-items-center"}>
                            <div className={"col"}>
                                <h3 className={`text-primary`}>Reviews</h3>
                            </div>
                            <div className={"col-2 col-md-1 text-end pe-3"}>
                                <i role={"button"} className="fa-solid fa-ellipsis text-primary fs-3"
                                   onClick={goToFoodReviews}/>
                            </div>
                        </div>
                        {
                            reviews.length > 0 &&
                            <FoodReviews reviews={reviews} refresh={findReviews}/>
                        }
                    </div>
                    <div className={'m-3'}>
                        <h3 className={"text-primary mt-5"}>Add My Review</h3>
                        <CreateReview foodId={foodId} refresh={findReviews}/>
                    </div>
                </div>
            </div>
            {
                recommendations.length > 0 &&
                <div className={"col-12 mt-4"}>
                    <div className={"row align-items-center"}>
                        <div className={"col"}>
                            <h4 className={"text-primary m-1 p-1"}>You May Also Like:</h4>
                        </div>
                        <div className={"col-1 text-end"}>
                            <i role={"button"} className="fa-solid fa-ellipsis text-primary fs-3"
                               onClick={goToRecommendations}/>
                        </div>
                    </div>
                    <div className={"col-12 bg-light m-2 p-4 border"}>
                        {
                            recommendations.length > 0 &&
                            <FoodGallery food={recommendations} posterOnClickHandler={(food) => navigate(`${FOOD_DETAIL_URL}/${food.id}`)}/>
                        }
                    </div>
                </div>
            }
        </div>
    )
};
export default FoodDetailsScreen;