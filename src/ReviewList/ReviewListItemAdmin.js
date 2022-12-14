import * as authService from "../services/auth-service";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import StarRating from "../StarRate";

const ReviewItemAdmin = ({item, deleteReview}) => {

    const [user, setUser] = useState({});

    useEffect(()=>{
        try{
            const getUserById = async() => await authService.findUserById(item.reviewByUserId)
                .then((user) => setUser(user));
            let user = getUserById();
        } catch(e){

        }
    },[])

    return (
        <>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-3 d-md-block d-sm-none d-none">
                        <Link to={`/detail/${item.businessId}/${item.reviewByUserId}`} className="wd-gold">
                            <p className="wd-movie wd-gold">{item.businessName}</p>
                        </Link>
                    </div>
                    <div className="col-9 col-sm-8">
                        <StarRating rating={item.star}/>
                        <i className="bi bi-x-lg float-end" onClick={() => deleteReview(item._id)}></i>
                        <p className="mt-3">"{item.text}"</p>
                        <p className="wd-white wd-signin">
                                <Link to={`/profile/${user.username}`} className="wd-white">
                                     <span className="fst-italic">
                                         {user && user.firstName} {user && user.lastName}
                                     </span>
                                </Link>
                        </p>
                        <p className="wd-right me-1">{item.reviewTime.substring(0, 10)}</p>

                    </div>
                </div>
            </li>
        </>

    );
}
export default ReviewItemAdmin;