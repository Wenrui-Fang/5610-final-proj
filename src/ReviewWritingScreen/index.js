import React, {useState} from "react";
import StarRating from "../StarRate";
import * as reviewService from "../services/ReviewService.js"
import * as authService from "../services/auth-service.js"
import {useNavigate, useParams} from "react-router";
import {starNum} from "../StarRate";
import {Link} from "react-router-dom";
import {SearchBar} from "../SearchLandingScreen/SearchBar/SearchBar";

const ReviewComponent = () => {
    const {businessId,businessName} = useParams();
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
        navigate(`/detail/${businessId}`);
    }

    const [currentUser, setCurrentUser] = useState({});
    const getProfile = async () => await authService.profile()
        .then(user => setCurrentUser(user));
    let user = getProfile();

    const reviewClickHandler = () => {
        const newReview = {
            businessId: businessId,
            businessName: businessName,
            text: reviewComment,
            star: starNum,
            reviewByUserId: currentUser._id
        }
        reviewService.createReview(newReview).then(() => customizedAlert("Posted successfully! Jump in three seconds...", 3000))
            .then(() => setTimeout(nav, 3000))
            .catch(e => alert(e));
    }
    return (
        <>
            <SearchBar loggedIn={true} currentUser={currentUser}/>
            <hr className="text-secondary"/>
            <div className="container">
                <Link to={`/detail/${businessId}`} className="text-decoration-none">
                    <h2 className="fw-bolder text-black">{businessName}</h2>
                </Link>
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