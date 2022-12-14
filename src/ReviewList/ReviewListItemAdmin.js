import * as authService from "../services/auth-service";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import StarRating from "../StarRate";

const ReviewItemAdmin = ({item,deleteReview}) => {

    const [user, setUser] = useState({});

    useEffect(()=>{

        const getUserById = async() => await authService.findUserById(item.reviewByUserId)
            .then(user => setUser(user));
        let user = getUserById();

    },[])

    return (
        <>
            <li className="list-group-item">
                <div className="row">

                    <div className="col-3 d-md-block d-sm-none d-none">

                        <Link to={`/details/${item.businessId}`} className="wd-gold">
                            <p className="wd-movie wd-gold">{item.businessName}</p></Link>
                    </div>

                    <div className="col-9 col-sm-8">
                        <StarRating rating={item.star}/>
                        <i className="fas fa-times-circle float-end wd-gold fa-2x" onClick={() => deleteReview(item._id)}/>
                        <p className="mt-3">"{item.text}"</p>
                        <p className="wd-white wd-signin">by.<Link to={`/profile/${user.username}`} className="wd-white" ><span className="fst-italic">{user.firstName} {user.lastName}</span></Link></p>
                        <p className="wd-right me-1">{item.reviewTime.substring(0, 10)}</p>

                    </div>
                </div>
            </li>
        </>

    );
}
export default ReviewItemAdmin;