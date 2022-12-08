import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {useState} from "react";
import * as reviewServices from "../../service/reviewServices";
import * as errorServices from "../../service/errorServices";
import {MY} from "../../service/utils";

const CreateReview = ({foodId, refresh}) => {
    const loggedIn = useSelector(isLoggedIn);
    const [review, setReview] = useState({review: ""});
    const createReview = () => {
        if (!loggedIn) {
            alert("Please login first")
            return;
        }
        if (!review.rating || !review.review) {
            alert("Please enter your review and rating");
            return;
        }
        reviewServices.createReview(MY, {...review, foodId: foodId})
            .then(refresh)
            .catch(errorServices.alertError);
        setReview({foodId: foodId, review: ""});
    }
    return (
        <div className={"row mt-4"}>

            <label className={"col-12 fw-bold m-1"}>
                Rating: {review.rating ? review.rating : 0}
                <input type="range" className="form-range" min="0" max="10" value={review.rating ? review.rating : 0}
                       onChange={(e) =>
                           setReview({...review, rating: e.target.value})}/>
            </label>
            <label className={"col-12 fw-bold m-1"}>
                Review:
                <textarea className={"form-control"} rows={3} value={review.review}
                          onChange={(e) =>
                              setReview({...review, review: e.target.value})}/>
            </label>
            {
                foodId &&
                <div className={"col-12 m-2"} align={`right`}>
                    <button className={"btn btn-primary"} onClick={createReview}>Submit</button>
                </div>
            }
        </div>
    )
};
export default CreateReview;
