import {IMAGE_PLACEHOLDER, MY} from "../../service/utils";
import * as foodServices from "../../service/foodServices";
import * as errorServices from "../../service/errorServices";
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";

const FoodItem = ({
                       food = {
                           title: "Spider-Man: No Way Home",
                           release_date: "2021-12-15",
                           poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
                       }, posterOnClickHandler, addFoodOnClickHandler, refresh=() => {}, allowLike =false
                   }) => {
    const loggedIn = useSelector(isLoggedIn);
    const [stats, setStats] = useState({});
    const [liked, setLiked] = useState(false);
    const posterPath =
        food.poster_path ? `${process.env.REACT_APP_FOOD_BASE_URL}/w342/${food.poster_path}` : IMAGE_PLACEHOLDER;
    const findFoodStats = useCallback(
        () => {
            foodServices.findFoodStats(food.id).then(s => {
                if (s) {
                    setStats(s.stats);
                }
            }).catch(errorServices.alertError);
        }, [food.id]
    )
    const findIAlreadyLikedFood = useCallback(
        () => {
            foodServices.findUserLikesFood(MY, food.id)
                .then(res => setLiked(!!res))
                .catch(errorServices.alertError);
        }, [food.id]
    )
    const likeFood = () => {
        if (!loggedIn) {
            alert("Please login first!");
            return;
        }
        if (food && food.id) {
            foodServices.userLikesFood(MY, food.id)
                .then(() => {
                    init();
                    refresh();
                })
                .catch(errorServices.alertError);
        }
    }
    const init = () => {
        if (food && food.id) {
            if (loggedIn) {
                findIAlreadyLikedFood();
            } else {
                setLiked(false);
            }
            findFoodStats();
        }
    }
    useEffect(init, [findIAlreadyLikedFood, findFoodStats, loggedIn, food]);
    return (
        <div className={"col"}>
            <div className={"h-100 shadow position-relative bg-white rounded-bottom"}>
                <div role={"button"} className={"overflow-hidden bg-black rounded-top"} style={{width: "100%", height: "0", paddingBottom: "150%"}}
                     onClick={() => posterOnClickHandler(food)}>
                    <img className={"img-fluid w-100"} src={posterPath} alt={"Poster Not Found"}/>
                </div>
                <div className={"p-2 ps-lg-3 pe-md-3 bg-white rounded-bottom overflow-hidden"}>
                    <div>
                        <div className={"fs-6 fw-bold"}>{food.title}</div>
                        <div className={"fs-6 text-secondary d-none d-lg-block"}>{food.release_date}</div>
                    </div>
                </div>
                {
                    allowLike &&
                    <div className={"position-absolute badge rounded-pill bg-danger fs-6"} style={{top: "-0.5rem", right: "-1rem", zIndex: 100}}
                        onClick={allowLike? likeFood: undefined}>
                        {
                            !liked &&
                            <i className={"fa-regular fa-heart"}/>
                        }
                        {
                            liked &&
                            <i className={"fa-solid fa-heart"}/>
                        }
                        {stats.likes > 0 && <span className={"ps-2"}>{stats.likes}</span>}
                    </div>
                }
                {
                    addFoodOnClickHandler &&
                    <div role={"button"} className={"position-absolute"} onClick={() => addFoodOnClickHandler(food)} style={{bottom: "-0.5rem", right: "-0.5rem", zIndex: 100}}>
                        <i className={"fa-solid fs-2 fa-circle-plus text-danger"}/>
                    </div>
                }
            </div>
        </div>
    )
};
export default FoodItem;