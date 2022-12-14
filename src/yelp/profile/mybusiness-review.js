import {useEffect, useState} from "react";
import "./index.css"
import * as reviewService from "../../services/ReviewService";
import ReviewList from "../../ReviewList/ReviewList";


const BussinessReviews = ({profileId}) => {

    const [reviews,setReviews] = useState([]);

    useEffect(()=>{
        const getMyReviews = async () => await reviewService.getReviewsByBusinessId(profileId)
            .then(reviews=>{
                console.log(reviews);
                setReviews(reviews)});

        let callGetReviews = getMyReviews();
        console.log(callGetReviews);
    },[]);

    return(
        <div className="mb-5">
            <ReviewList reviews={reviews}/>
        </div>
    );



};

export default BussinessReviews;