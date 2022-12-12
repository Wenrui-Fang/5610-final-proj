import React from "react";
import StarRating from "../StarRate";
import {Link} from "react-router-dom";

const PostItem = (props) => {
    let business = props.business
    let loggedIn = props.loggedIn
    return (
        <li className="d-inline-block">
            <Link to={loggedIn ? `/review/${business.id}`: "/login"} className="text-decoration-none text-black">
                <div className="row ms-5 me-5 ps-3 mb-4">
                    <div className="col-5">
                        <img width={150} height={150} className="rounded-3" alt="business"
                             src={`${business.image_url}`}/>
                    </div>
                    <div className="col-7">
                        <div className="ps-3">
                            <h3 className="fw-bolder pt-4">
                                {business.name}
                            </h3>
                            Do you recommend this business?
                            <StarRating/>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
};
export default PostItem;