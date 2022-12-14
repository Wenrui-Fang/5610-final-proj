import * as authService from "../services/auth-service";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import StarRating from "../StarRate";

const ReviewListItem = ({item}) => {

    const [user, setUser] = useState([{}]);

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
                    <div className="col-9 col-sm-8">
                        <div className="d-flex">
                            <div className="pe-2">
                                {
                                    <img src={user.profilePhoto===undefined?"https://pbs.twimg.com/profile_images/1599202909962412032/QbvIJjti_400x400.jpg":`${user.profilePhoto}`} className="reviewList-photo"/>
                                }
                            </div>
                            <div className="w-100">
                                <h2
                                    className="fs-5 mt-3">
                                    <Link to={`/profile/${user.username}`} className="text-decoration-none" >
                                        <b>{user && user.firstName} {user && user.lastName}</b>
                                    </Link>
                                </h2>
                            </div>
                        </div>
                        <StarRating rating={item.star}/>
                        <p className="mt-3">"{item.text}"</p>
                        <p className="wd-right me-1">{item.reviewTime.substring(0, 10)}</p>

                    </div>
                </div>
            </li>
        </>
    );
}
export default ReviewListItem;