import React from "react";
import StarRating from "../StarRate";

const PostItem = (
    {
        business = {
            "name": "Tony's Piazza",
            "image": "/images/pizza.jpeg",
        }
    }
) => {
    return (
        <li className="d-inline-block">
            <div className="row ms-5 me-5 ps-3 mb-4">
                <div className="col-5">
                    <img width={200} height={200} className="rounded-3" alt="business"
                         src={`/images/${business.image}`}/>
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
        </li>
    );
};
export default PostItem;