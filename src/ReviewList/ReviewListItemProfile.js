import React from "react";
import {Link} from "react-router-dom";
import StarRating from "../StarRate";

const ReviewListItemProfile = ({item}) => {
    return (
        <>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-9 col-sm-8">
                        <div className="d-flex">
                            <div className="w-100">
                                <h2
                                    className="fs-5 mt-3">
                                    <Link to={`/detail/${item.businessName}`} className="text-decoration-none" >
                                        <b>{item.businessName}</b>
                                    </Link>
                                </h2>
                            </div>
                        </div>
                        <StarRating rating={item.star}/>
                        <p className="mt-1 mb-1">"{item.text}"</p>
                        <p className="wd-right me-1">{item.reviewTime.substring(0, 10)}</p>

                    </div>
                </div>
            </li>
        </>
    );
}
export default ReviewListItemProfile;