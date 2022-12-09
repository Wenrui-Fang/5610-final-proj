import React, {useState} from "react";
import StarRating from "../StarRate";
import * as service from "../services/ReviewService.js"
import {useNavigate} from "react-router";
import {starNum} from "../StarRate";

const ReviewComponent = () => {
    let [reviewComment, setReviewComment] = useState('');
    const navigate = useNavigate();

    const customizedAlert = (msg, duration) => {
        const el = document.createElement("div");
        el.setAttribute("style", "position:absolute;top:40%;left:40%;background-color:green;color:white");
        el.innerHTML = msg;
        setTimeout(function () {
            el.parentNode.removeChild(el);
        }, duration);
        document.body.appendChild(el);
    }

    const nav = () => {
        navigate(`/`)
    }
    const reviewClickHandler = () => {
        const newReview = {
            restaurant: "Taco",
            text: reviewComment,
            star: starNum
        }
        service.createReview(newReview).then(() =>customizedAlert("Posted successfully! Jump in three seconds...", 3000))
            .then(() =>setTimeout(nav, 3000))
            .catch(e => alert(e));
    }
    return (
        <>
            <div className="row pt-3">
                <div className="col-6">
                    <h1 className="ps-3 fw-bolder">Yelp
                        <i className="bi bi-yelp text-danger"></i>
                    </h1>
                </div>
                <div className="col-6">
                    <i className="bi bi-person-circle fs-2 float-end pe-5"></i>
                </div>
            </div>
            <hr className="text-secondary"/>
            <div className="container">
                <h2 className="fw-bolder">Business Name</h2>
                Select a rating and leave you comment!
                <div>
                    <h3><StarRating/></h3>
                    <textarea
                        value={reviewComment}
                        cols="100"
                        rows="15"
                        placeholder="Doesn’t look like much when you walk past, but I was practically dying of hunger so I popped in.
                          The definition of a hole-in-the-wall. I got the regular hamburger and wow…  there are no words. A classic burger done right.
                          Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles).
                          There’s about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can’t go wrong.
                          Not much else to say besides go see for yourself! You won’t be disappointed."
                        className="border-1 ps-4 pt-4"
                        onChange={(event) => setReviewComment(event.target.value)}>
                    </textarea>
                </div>
                <div>
                    {/*<h2 className="fw-bolder">Attach photos</h2>*/}
                    {/*<br/>*/}
                    <button className="rounded-pill btn btn-primary mt-2 ps-3 pe-3 fw-bold"
                            onClick={reviewClickHandler}>
                        Post Review
                    </button>
                </div>
            </div>
        </>
    );
};
export default ReviewComponent;