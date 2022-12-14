import {useEffect, useState} from "react";
import "./index.css"
import ReviewListProfile from "../../ReviewList/ReviewListProfile";
import * as reviewService from "../../services/ReviewService";


const Reviews = ({profileId}) => {

    const [reviews,setReviews] = useState([]);

    useEffect(()=>{
        const getMyReviews = async () => await reviewService.getReviewsByUserId(profileId)
            .then(reviews=>{
                console.log(reviews);
                setReviews(reviews)});

        let callGetReviews = getMyReviews();
        console.log(callGetReviews);
    },[]);

    return(
        <div className="mb-5">
            <ReviewListProfile reviews={reviews}/>
        </div>
    );



};

export default Reviews;